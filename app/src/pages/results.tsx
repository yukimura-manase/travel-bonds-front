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
import { userStates, userCurrentPotisionType } from "@/store/user";
import { Loading } from "@/components/shared/ui/ui-elements/loading/Loading";
import { useRouter } from "next/router";
import { recommendedSpotsStates } from "@/store/recommendedSpots";
import ReccomendCard from "@/components/services/near-trip/card/ReccomendCard";
// import Map from "@/components/shared/ui/ui-parts/map/Map";
// import dynamic from "next/dynamic";
import MapRender from "@/components/shared/ui/ui-parts/map/MapRender";

const Results = () => {
  /** Router Instance */
  const router = useRouter();

  /** User の位置情報や、好きな場所の傾向リスト などを 管理する State */
  const userStatesProxy = useProxy(userStates);

  /** User の緯度 */
  const userLan = userStatesProxy.currentPosition.latitude;
  /** User の経度 */
  const userLng = userStatesProxy.currentPosition.longitude;

  /** おすすめ などを 管理する State */
  const recommendedSpotsStatesProxy = useProxy(recommendedSpotsStates);

  /** 地図に表示する Marker DataSet List */
  const mapMarkerList = recommendedSpotsStatesProxy.recommendedSpotList.map(
    (recommendedSpot) => {
      return {
        markerLanLng: [recommendedSpot.latitude, recommendedSpot.longitude],
        label: recommendedSpot.name,
      };
    }
  );

  return (
    <>
      {/* head タグ */}
      <Head>
        <title>提案結果</title>
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
        {/* ページ・タイトル */}
        <h2 css={EmotionStyle.pageTitle}>
          AI コンシェルジュからの おすすめスポット・提案結果
        </h2>

        {/* おすすめ提案のデータがある場合/ない場合 */}
        {recommendedSpotsStatesProxy.recommendedSpotList.length === 0 ? (
          // おすすめ先の提案データがない時のメッセージ Block
          <div css={EmotionStyle.noReccomendSpotList}>
            <h3 css={EmotionStyle.pageSubTitle}>
              おすすめ先の提案データがありません🥺
            </h3>
            {/* 戻るボタン */}
            <div>
              <Button
                onClick={() => router.push("/")}
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
                戻る
              </Button>
            </div>
          </div>
        ) : (
          // おすすめ提案のデータがある場合
          <div css={EmotionStyle.sectionWrapper}>
            {/* あなたの情報 Area */}
            <section css={EmotionStyle.sectionContainer}>
              <h3 css={EmotionStyle.pageSubTitle}>あなたの情報</h3>
              {/* 今、いる場所 Container */}
              <div css={EmotionStyle.userInputParamsContainer}>
                <span>今、いる場所:</span>
                <span css={EmotionStyle.userLocationParams}>
                  {userStatesProxy.currentPosition.address}
                </span>
              </div>
              {/* 好きな場所の傾向 Container */}
              <div css={EmotionStyle.userInputParamsContainer}>
                <span>好きな場所の傾向:</span>
                <span css={EmotionStyle.userFavoriteParams}>
                  {userStatesProxy.favoriteList.map(
                    (option: string, index: number) => {
                      return <span key={index}>{option}</span>;
                    }
                  )}
                </span>
              </div>
            </section>
            {/* おすすめ・スポット Card Area */}
            <section css={EmotionStyle.sectionContainer}>
              <h3 css={EmotionStyle.pageSubTitle}>
                おすすめ・スポット提案・Card
              </h3>
              <div css={EmotionStyle.reccomendCardWrapper}>
                {recommendedSpotsStatesProxy.recommendedSpotList.map(
                  (recommendedSpot, index) => {
                    return (
                      <ReccomendCard
                        key={index}
                        recommendedSpot={recommendedSpot}
                      />
                    );
                  }
                )}
              </div>
            </section>
            {/* Leaflet Map Area */}
            <section css={EmotionStyle.sectionContainer}>
              <h3 css={EmotionStyle.pageSubTitle}>おすすめ・スポットの場所</h3>
              <div>
                <MapRender
                  centerMarker={[userLan, userLng]}
                  recommendedSpots={mapMarkerList}
                />
              </div>
            </section>

            {/* 戻るボタンなどの Area */}
            <section>
              {/* 戻るボタン */}
              <div css={EmotionStyle.backBtnContainer}>
                <Button
                  onClick={() => router.push("/")}
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
                  戻る
                </Button>
              </div>
            </section>
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
    width: 90%;
    margin: 0 auto;
  `,

  /** h2 タグレベルの Page タイトル */
  pageTitle: css`
    text-align: center;
    margin-top: 20px;
    font-size: 24px;
    font-weight: 600;
  `,
  /** h3 タグレベルの Page タイトル */
  pageSubTitle: css`
    margin-top: 10px;
    margin-bottom: 25px;
    font-size: 20px;
    font-weight: 500;
  `,

  /** おすすめ先の提案データがない時のメッセージ Block */
  noReccomendSpotList: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
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

  /** 現在位置 & ユーザーの好きな傾向リスト Container */
  userInputParamsContainer: css`
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    font-size: 16px;
    font-weight: 600;
    margin-top: 5px;
    margin-bottom: 12px;
  `,

  /** 現在位置 & ユーザーの好きな傾向リスト */
  userLocationParams: css`
    color: blue;
    font-size: 16px;
    font-weight: 600;
  `,

  /** ユーザーの好きな傾向リスト */
  userFavoriteParams: css`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    color: blue;
    font-size: 16px;
    font-weight: 600;
  `,

  /** おすすめ・スポット Card Area の Wraper */
  reccomendCardWrapper: css`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    align-items: center;
  `,

  /** 戻るボタン Container */
  backBtnContainer: css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  `,
};

export default Results;
