/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { CSSProperties } from "react";

/** Propsの型定義 */
interface PropsType {
  src: string;
  altText?: string;
  imgWrapperStyle?: CSSProperties;
  imgStyle?: CSSProperties;
}

/**
 * NOTE: SquarePhotoCard
 * => 四角い SquarePhotoCard Component
 */
const SquarePhotoCard = (props: PropsType) => {
  const { src, altText, imgWrapperStyle, imgStyle } = props;
  /** DefaultStyle: 角丸・四角い SquarePhotoCard */
  const defaultPhotoStyle = {
    width: "250px",
    height: "250px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    objectFit: "cover",
    /** カードを浮き上がらせる影 */
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s ease-in-out",
  } as CSSProperties;

  return (
    <div style={imgWrapperStyle ? imgWrapperStyle : undefined}>
      <img
        src={src}
        alt={altText ? altText : ""}
        style={imgStyle ? imgStyle : defaultPhotoStyle}
      />
    </div>
  );
};

export default SquarePhotoCard;
