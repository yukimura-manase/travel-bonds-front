import { CSSProperties } from "react";

/** Propsの型定義 */
interface PropsType {
  src: string;
  altText?: string;
  style?: CSSProperties;
  imgWrapperStyle?: CSSProperties;
}

/**
 * NOTE: CirclePhotoCard
 * => 丸い CirclePhotoCard Component
 */
const CirclePhotoCard = (props: PropsType) => {
  /** DefaultStyle: 丸い・CirclePhotoCard */
  const defaultStyle = {
    objectFit: "cover",
    width: "62px",
    height: "62px",
    borderRadius: "31px",
  } as CSSProperties;

  return (
    <div style={props.imgWrapperStyle ? props.imgWrapperStyle : undefined}>
      <img
        src={props.src}
        alt={props.altText ? props.altText : ""}
        style={props.style ? props.style : defaultStyle}
      />
    </div>
  );
};
export default CirclePhotoCard;
