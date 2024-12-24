import { Html, Head, Main, NextScript } from "next/document";

// react의 index.html과 비슷한 역할을 하는 기본 컴포넌트
export default function Document() {
  return (
    <Html lang="ko">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
