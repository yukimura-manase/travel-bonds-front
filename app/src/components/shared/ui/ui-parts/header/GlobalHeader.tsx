/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import CirclePhotoCard from "@/components/shared/ui/ui-elements/images/CirclePhotoCard";

/** Global Header */
const GlobalHeader = () => {
  return (
    <header css={EmotionStyle.header}>
      {/* <div css={EmotionStyle.headerContentContainer}> */}
      {/* App Title Area */}
      <div css={EmotionStyle.appTitleContainer}>
        <h2 css={EmotionStyle.appTitle}>ふらっと旅 AI コンシェルジュ</h2>
        <h5 css={EmotionStyle.appSubTitle}>
          〜 あなたの気軽な旅のコンシェルジュ Web App 〜
        </h5>
      </div>

      {/* AI コンシェルジュ Image */}
      <div css={EmotionStyle.photoContainer}>
        <CirclePhotoCard
          src="/images/robotama.png"
          altText="AI コンシェルジュ ロボ玉"
        />
        <div css={EmotionStyle.robotama}>
          公式キャラ: AI コンシェルジュ ロボ玉
        </div>
      </div>
      {/* </div> */}
    </header>
  );
};

/** EmotionStyle */
const EmotionStyle = {
  /** header 全体の Wrapper Style */
  header: css`
    width: 100%;
    height: 120px;
    display: flex;
    justify-content: center;
    background-color: #f0f7ff;
  `,
  /** Header Content の Container */
  headerContentContainer: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 10px 20px;
  `,

  /** Title & SubTitle の Container Style */
  appTitleContainer: css`
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-items: center;
    justify-content: center;
  `,

  /** Main Title */
  appTitle: css`
    font-size: 28px;
    font-weight: 600;
  `,
  /** Sub Title */
  appSubTitle: css`
    font-size: 16px;
    font-weight: 100;
  `,

  /** Photo Container */
  photoContainer: css`
    position: absolute;
    right: 20px;
    top: 20px;
  `,

  /** 公式キャラ: AI コンシェルジュ ロボ玉 Text */
  robotama: css`
    position: relative;
    right: 80px;
    font-size: 14px;
    font-weight: 100;
  `,
};

export default GlobalHeader;
