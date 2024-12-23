import type { AppProps } from "next/app";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({
  // react의 App.tsx와 같이 루트 컴포넌트의 역할을 한다. 모든 페이지 컴포넌트들의 부모
  Component /*페이지 열할을 하는 컴포넌트*/,
  pageProps /*각 페이지들에게 전달될 props들을 객체로 보관한 것*/,
}: AppProps) {
  const router = useRouter();

  const onClickButton = () => {
    router.push("/test"); // Link와 같이 CSR로 이동하는 방식
    // router.replace('/test') // 뒤로가기를 방지(히스토리에서 이전 페이지 제거, 뒤로가기 시 이전 페이지로 이동이 아닌 전전 페이지로 이동)하며 CSR로 경로 이동
    // router.back() // 이전 경로로 이동
  };

  useEffect(() => {
    router.prefetch("/test"); // Link와 달리 router는 기본적으로 프리페치되지 않는다. 따라서 router의 prefetch 메소드를 이용해서 프리페치되도록 할 수 있다.
  }, []);

  return (
    <>
      <header>
        <Link href={"/"}>index</Link>
        &nbsp;
        <Link
          href={"/search"}
          prefetch={false} // Link 컴포넌트는 기본적으로 프리페치되지만 프리페치가 불필요할 것으로 예상된다면 prefetch={false}로 프리페치되지 않도록 할 수 있다.
        >
          search
        </Link>
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
