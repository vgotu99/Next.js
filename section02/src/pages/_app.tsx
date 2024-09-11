import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  // react의 App.jsx와 같은 역할을 한다.

  const router = useRouter();

  const onClickButton = () => {
    router.push("/test");
    // push method는 특정 페이지로 이동
    // back method는 뒤로가기를 실행
    // replace method는 뒤로가기를 방지하며 페이지를 이동
  };
  // Programmatic Navigation => Link component와 달리 특정 이벤트, 조건이 만족되었을 때 사용할 수 있다!
  // 또한 Programmatic Navigation의 경우에는 기본적으로 pre-fetching이 이루어지지 않는다.

  useEffect(() => {
    router.prefetch('/test')
  }, [])
  // Programmatic Navigation은 기본적으로 pre-fetching이 이루어지지 않으므로 useEffect를 이용하여 처음 마운트 되었을 때 prefetch method를 이용해서 특정 경로에 대해서 pre-fetching이 이루어지도록 해줄 수 있다.

  return (
    <>
      <header>
        <Link href={"/"}>index</Link>
        {/* 원하는 페이지로 이동할 수 있는 component로 특정 이벤트, 조건이 만족되었을 때 사용할 수는 없다. */}
        {/* 또한 Link component를 이용한 navigation은 pre-fetching이 기본적으로 이루어진다. */}
        &nbsp; {/* 띄어쓰기 추가 */}
        <Link href={"/search"} prefetch={false}>search</Link>
        {/* Link component에 prefetch={false} 속성을 주면 pre-fetching이 이루어지지 않게 된다. */}
        &nbsp;
        <Link href={"/book/1"}>book/1</Link>
        <div>
          <button onClick={onClickButton}>/test 페이지로 이동</button>
        </div>
      </header>
      <Component {...pageProps} />
    </>
  );
}
