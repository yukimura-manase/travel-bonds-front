/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function Page404() {
  return (
    <h2 className="primary" css={page404Css}>
      <div>
        <div className="text-404">404 </div>
        <div>NOT FOUND</div>
      </div>
    </h2>
  );
}

const page404Css = css`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  & > div {
    font-size: 64px;
    text-align: center;

    .text-404 {
      font-size: 5em;
    }
  }
`;

export default Page404;
