import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import { ReactNode } from "react";
// css를 불러옴.
// React와는 다르게 import style from './경로'로 작성하며 일반적인 CSS 파일이 아닌 CSS module의 형태임
// 왜 그냥 index.css 파일이 아닌 index.module.css 파일인가?
// 프로젝트가 커질 수록 class name을 관리하기 어려워진다. 따라서 React까지에서 사용했던 방식대로 class name을 할당한다면 추후 이슈가 발생할 수 있으므로 Next는 자체적으로 해당 방식을 차단한 것이다.
// 하지만 App component에서만 예외적으로 import './경로'와 같이 React에서 사용했던 방식으로 Global CSS를 import할 수 있다.

export default function Home() {
  return (
    <>
      <h1 className={style.h1}>인덱스</h1>
      {/* className={style.클래스네임} 으로 할당해준다 */}
      {/* index.module.css 파일에서 .클래스네임 { css 속성들~~~~~ }을 작성해준다 */}
      {/* 스타일 설정이 완료되었고 웹에서 개발자도구를 통해서 확인해보면 클래스네임이 겹치지 않는 임의의 값으로 할당되어있는 것을 확인할 수 있다. */}
      {/* 따라서 다른 component들에 있는 class name과 겹치는 일이 절대 발생하지 않는 것이다. */}
      <h2 className={style.h2}>H2</h2>
    </>
  );
}

Home.getLayout = (page:ReactNode) => {
  // getLayout method는 page를 매개변수로 page역할을 할 component를 받아온다.
  // Home이라는 함수에 method를 추가할 수 있는 이유는 모든 JS 함수는 사실 객체의 형태이다. 따라서 method를 추가해도 문제 없이 정상 작동하는 것!
  return <SearchableLayout>{page}</SearchableLayout>
  // SearchableLayout으로 감싸진 page를 리턴해준다.
}
// SearchableLayout component가 index페이지에서만 노출되길 원하기 때문에 이런 형태로 코드를 작성하면 자연스럽게 _app.tsx에 넘어가게 되고 index페이지에서 Home.getLayout에서 리턴된 페이지를 보여주는 것이다.