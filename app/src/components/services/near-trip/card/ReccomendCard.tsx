/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import { recommendedSpotType } from "@/store/recommendedSpots";
import SquarePhotoCard from "@/components/shared/ui/ui-elements/images/SquarePhotoCard";

interface ReccomendCardProps {
  recommendedSpot: recommendedSpotType;
  image?: string;
}

// {
//   address: "千葉県浦安市舞浜１−１",
//   description:
//     "東京ディズニーランドは、日本の千葉県浦安市舞浜にあるディズニーパークである。",
//   latitude: 35.6329,
//   longitude: 139.8804,
//   name: "東京ディズニーランド",
//   recommended_points: "ディズニーキャラクターとの写真撮影",
// },

const ReccomendCard = (props: ReccomendCardProps) => {
  const { recommendedSpot, image } = props;
  return (
    <div css={EmotionStyle.mainCardWrapper}>
      {/* Image Block */}
      <div css={EmotionStyle.photoContainer}>
        {image ? (
          // <SquarePhotoCard src={image} altText={recommendedSpot.name} />
          <img
            src={image}
            alt={recommendedSpot.name}
            css={EmotionStyle.imageStyle}
          />
        ) : (
          <img
            src={"/images/no_image_logo.png"}
            alt={recommendedSpot.name}
            css={EmotionStyle.imageStyle}
          />
        )}
      </div>

      {/* Text Block */}
      <div css={EmotionStyle.cardTextBlockWrapper}>
        <h3>
          場所の名前:
          <span css={EmotionStyle.reccomendPlace}>{recommendedSpot.name}</span>
        </h3>
        <p>概要説明: {recommendedSpot.description}</p>
        <p>住所: {recommendedSpot.address}</p>
        <p>
          おすすめポイント:
          <span css={EmotionStyle.reccomendPoint}>
            {recommendedSpot.recommended_points}
          </span>
        </p>
      </div>
    </div>
  );
};

/** EmotionStyle */
const EmotionStyle = {
  /** Module Card 全体の Wrapper */
  mainCardWrapper: css`
    position: relative;
    width: 360px;
    height: 420px;
    background-color: #fff;
    padding: 12px;
    cursor: pointer;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.2) 2px 2px 2px 1px;
    -webkit-transition: 0.3s;
    transition: 0.3s;
    &:hover {
      box-shadow: 0 12px 24px #00000029;
      -webkit-transform: translateY(-8px);
      -moz-transform: translateY(-8px);
      -ms-transform: translateY(-8px);
      transform: translateY(-8px);
    }
  `,
  /** 写真の Cotanier */
  photoContainer: css`
    width: 360px;
  `,
  /** 写真の Style */
  imageStyle: css`
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 5px;
  `,
  /** Card Text Block Wrapper */
  cardTextBlockWrapper: css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* gap: 10px; */
    padding: 12px;
    h3 {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 10px;
    }
    p {
      font-size: 16px;
      margin-bottom: 10px;
    }
  `,
  /** おすすめの場所の名前 */
  reccomendPlace: css`
    color: #3c52b2;
  `,
  /** おすすめポイント */
  reccomendPoint: css`
    font-weight: 600;
    color: orange;
  `,
};

export default ReccomendCard;
