import GlobalLayout from "@/components/global-layout";
import "@/styles/globals.css";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactNode } from "react";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import { useEffect } from "react";
type NextPageWithLayout = NextPage & {
  // NextPage는 Next.js에서 기본적으로 제공하는 page component의 type
  // & 를 사용해서 NextPage에 새로운 type을 교집합으로 추가해주었다.
  getLayout?: (page: ReactNode) => ReactNode;
  // 새로운 type인 getLayout이라는 property를 추가해주었다.
  // page를 매개변수를 받는데 ReactNode type이고 반환값 또한 ReactNode type으로 설정해주었다.
  // ?로 getLayout이라는 method가 없을 때를 대비해서 optional type으로 만들어주었다.
};

export default function App({
  Component,
  pageProps,
}: AppProps & {
  // App component가 받는 props의 type에 교집합으로 새로운 type을 교집합으로 추가해주었다.
  Component: NextPageWithLayout;
  // Component의 새로운 type을 NextPageWithLayout으로 정의해주었다.
}) {
  // react의 App.jsx와 같은 역할을 한다.

  // const router = useRouter();
  // const onClickButton = () => {
  //   router.push("/test");
  //   // push method는 특정 페이지로 이동
  //   // back method는 뒤로가기를 실행
  //   // replace method는 뒤로가기를 방지하며 페이지를 이동
  // };
  // // Programmatic Navigation => Link component와 달리 특정 이벤트, 조건이 만족되었을 때 사용할 수 있다!
  // // 또한 Programmatic Navigation의 경우에는 기본적으로 pre-fetching이 이루어지지 않는다.

  // useEffect(() => {
  //   router.prefetch('/test')
  // }, [])
  // // Programmatic Navigation은 기본적으로 pre-fetching이 이루어지지 않으므로 useEffect를 이용하여 처음 마운트 되었을 때 prefetch method를 이용해서 특정 경로에 대해서 pre-fetching이 이루어지도록 해줄 수 있다.

  // return (
  //   <>
  //     <header>
  //       <Link href={"/"}>index</Link>
  //       {/* 원하는 페이지로 이동할 수 있는 component로 특정 이벤트, 조건이 만족되었을 때 사용할 수는 없다. */}
  //       {/* 또한 Link component를 이용한 navigation은 pre-fetching이 기본적으로 이루어진다. */}
  //       &nbsp; {/* 띄어쓰기 추가 */}
  //       <Link href={"/search"} prefetch={false}>
  //         search
  //       </Link>
  //       {/* Link component에 prefetch={false} 속성을 주면 pre-fetching이 이루어지지 않게 된다. */}
  //       &nbsp;
  //       <Link href={"/book/1"}>book/1</Link>
  //       <div>
  //         <button onClick={onClickButton}>/test 페이지로 이동</button>
  //       </div>
  //     </header>
  //   </>
  // );

  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);
  // Component.getLayout에서 getLayout이라는 method는 임의로 만들어둔 method이기 때문에 type error가 발생한다. 따라서 Component의 type에 getLayout이라는 method가 존재할 거라는 type 정보를 위에서 정의해주었다.
  // ?? ((page:ReactNode) => page)로 getLayout method가 설정되어 있지 않은 page에 경우 page 그대로를 렌더링해주도록 예외처리를 해주었다

  return <GlobalLayout>{getLayout(<Component {...pageProps} />)}</GlobalLayout>;
}
