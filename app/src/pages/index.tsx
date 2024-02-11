/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import GlobalHeader from "@/components/shared/ui/ui-parts/header/GlobalHeader";
import HorizontalLine from "@/components/shared/ui/ui-elements/line/HorizontalLine";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import CheckboxGroup from "@/components/shared/ui/ui-parts/checkbox-group/CheckboxGroup";
import {
  favoriteCheckboxStates,
  favoriteOptionType,
} from "@/store/favoriteCheckbox";
import { useProxy } from "valtio/utils";
import { Loader } from "@googlemaps/js-api-loader";
import { userStates } from "@/store/user";
import { Loading } from "@/components/shared/ui/ui-elements/loading/Loading";
import { useRouter } from "next/router";
import { recommendedSpotsStates } from "@/store/recommendedSpots";

export interface gpsErrorType {
  code: number;
}

const Home = () => {
  // console.log("Topページ表示");

  /** Router Instance */
  const router = useRouter();

  // おすすめの場所を提案する処理を実行中の Loading フラグ
  const [isReccoemndExcute, setIsReccoemndExcute] = useState(false);

  /** 好きな場所の傾向 Option リスト などを 管理する State */
  const favoriteCheckboxStatesProxy = useProxy(favoriteCheckboxStates);

  /** User の位置情報や、好きな場所の傾向リスト などを 管理する State */
  const userStatesProxy = useProxy(userStates);

  /** おすすめ などを 管理する State */
  const recommendedSpotsStatesProxy = useProxy(recommendedSpotsStates);

  /** お気に入り Option List */
  const favoriteOptionList = favoriteCheckboxStatesProxy.favoriteOptionList;

  /**
   * NOTE: Checkbox の初期状態
   * - 一意の ID を文字列化したものを Key に、初期値を false とした Object を作成
   * - Sample: initialState = { 1: false, 2: false, 3: false, ...}
   */
  const initialState = favoriteOptionList.reduce(
    (result: any, current: any) => {
      result[current.id] = false;
      return result;
    },
    {} as Record<string, boolean>
  );

  // Checkbox Group の State
  const [checkboxes, setCheckboxes] =
    useState<Record<string, boolean>>(initialState);

  // Checkbox の状態が変化した時のイベント
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckboxes({ ...checkboxes, [event.target.name]: event.target.checked });
  };

  // DEBUG: Checkbox の状態が変化した時のイベント
  useEffect(() => {
    console.log("Step2 CheckBox 変更検知");

    console.log("checkboxes", checkboxes);
  }, [checkboxes]);

  // 位置情報取得中の Loading フラグ
  const [isGetLocationLoading, setIsGetLocationLoading] = useState(false);

  // User の現在位置 (緯度・経度) を取得する
  const getLocation = () => {
    if (navigator.geolocation) {
      // 位置情報取得中の Loading フラグを ON
      setIsGetLocationLoading(true);
      navigator.geolocation.getCurrentPosition(getPosition, getPositionError);
    } else {
      alert("GPS の位置情報・取得機能を ブラウザがサポートしていません。");
    }
  };

  const getPosition = (position: any) => {
    // GPS 位置情報 データ: 緯度・経度
    const { latitude, longitude } = position.coords;

    console.log("position", position);
    console.log("緯度: " + latitude);
    console.log("経度: " + longitude);

    // Google Maps Loader
    const googleMapsLoader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
      version: "weekly",
    });

    // Google Mapsで住所を取得
    googleMapsLoader
      .load()
      .then(() => {
        const geocoder = new google.maps.Geocoder();
        const latlng = new google.maps.LatLng(latitude, longitude);
        console.log("latlng", latlng);

        geocoder.geocode({ latLng: latlng }, (results, status) => {
          console.log("status", status);
          console.log("results", results);

          if (status === google.maps.GeocoderStatus.OK) {
            // 住所をセット
            userStatesProxy.currentPosition.address =
              results[0].formatted_address;
          } else {
            alert("エラー" + status);
          }
          // 位置情報取得中の Loading フラグを OFF
          setIsGetLocationLoading(false);
        });
      })
      .catch((error) => {
        console.log("error", error);
        // 位置情報取得中の Loading フラグを OFF
        setIsGetLocationLoading(false);
      });
  };

  /** 位置情報(GPS) */
  const getPositionError = (error: gpsErrorType) => {
    switch (error.code) {
      case 1:
        alert("位置情報が許可されませんでした。");
        break;
      case 2:
        alert("位置情報が取得できませんでした。");
        break;
      case 3:
        alert("タイムアウトしました。");
        break;
      default:
        alert("原因不明のエラーが発生しました。");
        break;
    }
  };

  /**
   * NOTE: aiReccomendSpotsExcute
   * - BackEnd-API 経由で GPT が おすすめの場所を提案する処理を実行する
   * - BackEnd-API に渡す Request データを作成する
   *
   */
  const aiReccomendSpotsExcute = async () => {
    console.log("おすすめの場所を提案する処理を実行します。");

    // 1. おすすめの場所を提案する処理を実行中の Loading フラグを ON
    setIsReccoemndExcute(true);

    // 位置情報(GPS)が取得されていない場合は、アラートを表示して処理を中断する
    if (userStatesProxy.currentPosition.address === "") {
      alert("位置情報(GPS)を取得してください。");
      setIsReccoemndExcute(false);
      return;
    }

    // 2. checkboxes の状態から、選択された好きな場所の傾向リストを作成
    const selectedFavoriteIdList = Object.keys(checkboxes).filter(
      (key) => checkboxes[key]
    );
    console.log("selectedFavoriteIdList", selectedFavoriteIdList);

    /** お気に入りの傾向・場所 Name・リスト (BackEnd に渡すパラメーター) */
    const selectedFavoriteNameList: string[] = [];

    // 2. 選択された好きな場所の傾向リストから、お気に入りの傾向・場所 Name・リストを作成
    selectedFavoriteIdList.forEach((favoriteId) => {
      /** Select されている Option */
      const favoriteOption = favoriteOptionList.find(
        (favorite) => favorite.id.toString() === favoriteId
      );
      console.log("favoriteOption", favoriteOption);

      if (favoriteOption) {
        selectedFavoriteNameList.push(favoriteOption.name);
      }
    });
    console.log(
      "お気に入りの傾向・場所 Name・リスト",
      selectedFavoriteNameList
    );

    // Store に User の好きな場所の傾向リストをセットする
    userStatesProxy.favoriteList = selectedFavoriteNameList;

    // 選択された好きな場所を1つも選択していない場合は、アラートを表示して処理を中断する
    if (selectedFavoriteNameList.length === 0) {
      alert("好きな場所の傾向を選択してください。");
      setIsReccoemndExcute(false);
      return;
    }

    // 3. BackEnd-API にFetchリクエストを送信する

    try {
      /** 送信するParameter */
      const requestBody = {
        favoriteList: selectedFavoriteNameList,
        userCurrentPosition: userStatesProxy.currentPosition,
      };

      console.log("requestBody", requestBody);

      // Flask-APIに、Post通信
      const response = await fetch(
        "http://localhost:5001/api/recommend-spots",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // JSON形式で送信する
          },
          body: JSON.stringify(requestBody), // リクエストボディーにJSONデータを設定
        }
      );

      /** おすすめ Spot データ */
      const results = await response.json();
      console.log("結果", results);

      // 結果を取得する
      if (results.data) {
        // Store に AIコンシェルジュからの おすすめスポット・リスト をセットする
        recommendedSpotsStatesProxy.recommendedSpotList = results.data;
        // BackEndから結果が返ってきたら、結果ページに移動する
        router.push("/results");
      } else {
        setIsReccoemndExcute(false);
        alert("おすすめの場所を提案する処理に失敗しました。");
      }
    } catch (error: any) {
      console.error(error);
      setIsReccoemndExcute(false);
      alert(
        `おすすめの場所を提案する処理に失敗しました。
        BackEnd API Error
        `
      );
    }
  };

  return (
    <>
      {/* head タグ */}
      <Head>
        <title>ふらっと旅 AI コンシェルジュ</title>
        <meta name="description" content="ふらっと旅🌟 Web App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* header タグ*/}
      <GlobalHeader />
      {/* 境界線 */}
      <HorizontalLine />
      {/* main コンテンツ */}
      <main css={EmotionStyle.mainWrapperStyle}>
        {isReccoemndExcute ? (
          // おすすめの場所を提案する処理を実行中
          <div css={EmotionStyle.reccoemndLoading}>
            <Loading />
          </div>
        ) : (
          <div>
            {/* ページ・タイトル */}
            <h2 css={EmotionStyle.pageTitle}>
              このアプリの使い方🌟 〜 簡単 3 Step 〜
            </h2>
            {/* Section Wrapper */}
            <div css={EmotionStyle.sectionWrapper}>
              {/* STEP 1 */}
              <section css={EmotionStyle.sectionContainer}>
                <h3 css={EmotionStyle.pageSubTitle}>
                  1. 位置情報(GPS)の取得の許可してください
                </h3>
                <p>このアプリは位置情報(GPS)を使用します。</p>
                {/* 現在の位置情報 */}
                <div>
                  {userStatesProxy.currentPosition.address !== "" && (
                    <div css={EmotionStyle.currentPositionAddress}>
                      現在位置: {userStatesProxy.currentPosition.address}
                    </div>
                  )}
                </div>
                <div>
                  {isGetLocationLoading && (
                    <div css={EmotionStyle.locationLoading}>
                      <Loading />
                    </div>
                  )}
                </div>

                <Button
                  onClick={() => {
                    getLocation();
                  }}
                  sx={{
                    mt: 3,
                    mb: -1.5,
                    padding: 0.5,
                    width: "150px",
                    color: "#fff",
                    backgroundColor: "#3c52b2",
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: "#2586a1",
                      color: "#fff",
                    },
                  }}
                >
                  位置情報を取得
                </Button>
              </section>

              {/* STEP 2 */}
              <section css={EmotionStyle.sectionContainer}>
                <h3 css={EmotionStyle.pageSubTitle}>
                  2. あなたの好きな場所のタイプに該当するものを選択してください
                </h3>
                <p css={EmotionStyle.checkboxDescription}>
                  (いくつでも選択して、OK 🙆‍♂️)
                </p>
                {/* 好きな場所の傾向のチェックボックス Group */}
                <CheckboxGroup
                  checkboxesState={checkboxes}
                  onChange={handleChange}
                  options={favoriteOptionList}
                />
              </section>

              {/* STEP 3 */}
              <section css={EmotionStyle.sectionContainer}>
                <h3 css={EmotionStyle.pageSubTitle}>
                  3.
                  実行ボタンを押すと、今いる場所とあなたの好きな場所の傾向から、おすすめの旅先・遊び場を提案します🌟
                </h3>
                <p>
                  <Button
                    onClick={() => {
                      aiReccomendSpotsExcute();
                    }}
                    autoFocus
                    sx={{
                      mt: 3,
                      mb: -1.5,
                      padding: 0.5,
                      width: "150px",
                      color: "#fff",
                      backgroundColor: "#3c52b2",
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "#2586a1",
                        color: "#fff",
                      },
                    }}
                  >
                    遊び場を提案
                  </Button>
                </p>
              </section>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

/** EmotionStyle */
const EmotionStyle = {
  /** main Area 全体の Wrapper Style */
  mainWrapperStyle: css`
    width: 85%;
    margin: 0 auto;
  `,

  /** h2 タグレベルの Page タイトル */
  pageTitle: css`
    margin-top: 20px;
    font-size: 24px;
    font-weight: 600;
  `,
  /** h3 タグレベルの Page タイトル */
  pageSubTitle: css`
    margin-top: 20px;
    font-size: 20px;
    font-weight: 500;
  `,

  /** Section Wrapper */
  sectionWrapper: css`
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 20px;
    padding: 20px 20px 50px 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  `,

  /** 各 Step の Section Container */
  sectionContainer: css`
    margin: 20px 0px;
  `,

  /** 現在位置 */
  currentPositionAddress: css`
    color: blue;
    font-size: 20px;
    font-weight: 600;
    margin-top: 5px;
    margin-bottom: 12px;
  `,
  /** 位置情報取得中の Loading */
  locationLoading: css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5px;
    margin-bottom: 12px;
  `,
  /** おすすめ・スポット提案中の Loading Style */
  reccoemndLoading: css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); /* x軸, y軸 */
  `,

  /** Checkbox Description */
  checkboxDescription: css`
    font-size: 16px;
    font-weight: 100;
    margin-top: 5px;
    margin-bottom: 12px;
  `,

  /** 公式キャラ: AI コンシェルジュ ロボ玉 Text */
  robotama: css`
    position: relative;
    right: 80px;
    font-size: 14px;
    font-weight: 100;
  `,
};

export default Home;
