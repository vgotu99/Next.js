import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import type { ReactNode } from "react";
import BookItem from "@/components/book-item";
import type {
  // InferGetServerSidePropsType,
  InferGetStaticPropsType,
} from "next";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";

// // 인덱스 페이지인 Home 컴포넌트보다 먼저 실행되어 사전 렌더링(SSR)되도록 하는 함수, 따라서 서버측에서 딱 한번만 실행되는 함수이다. 따라서 클라이언트측에서 사용하려면 리턴한 props의 값을 전달받아 사용해야한다.
// export const getServerSideProps = async () => {
//   // 서버측에서 실행되는 함수이기 때문에 클라이언트측에서 동작하는 코드는 작성할 수 없다.
//   // 해당 페이지 컴포넌트에서 사용할 데이터를 미리 페치해오는데 사용하면 될 거 같다!

//   // 아래는 기존 직렬방식으로 하나씩 실행하는 구조
//   // const allBooks = await fetchBooks();
//   // const recommendBooks = await fetchRandomBooks();
//   const [allBooks, recommendBooks] = await Promise.all([
//     // Promise.all method는 인수로 전달한 배열 안에 들어있는 모든 비동기 함수들을 동시에(병렬로) 실행시켜준다!
//     fetchBooks(),
//     fetchRandomBooks(),
//   ]);

//   // 리턴값은 props라는 프로퍼티를 포함하는 객체여야한다.
//   return {
//     props: {
//       allBooks,
//       recommendBooks,
//     },
//   };
// };

// 사전 렌더링(SSG)되도록 하는 함수
// 정적 사이트 생성(SSG) 방식은 빌드 이후에만 적용되며, 말 그대로 빌드 시점 기준인 정적 페이지를 생성하는 것이다.
// 정적페이지이기에 아주 빠른 응답속도를 제공하지만 동적 값을 처리할 수 없다는 단점이 있음!
export const getStaticProps = async () => {
  console.log("인덱스 페이지");

  const [allBooks, recommendBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks(),
  ]);

  return {
    props: {
      allBooks,
      recommendBooks,
    },
    // revalidate: 3, // 3초 주기로 재검증(SSG로 생성된 페이지를 재생성하여 3초마다 업데이트 반영) => 기존 SSG 방식에서 디벨롭된 ISR 방식으로 렌더링
  };
};

export default function Home(
  {
    allBooks,
    recommendBooks,
  }: InferGetStaticPropsType<
    typeof getStaticProps
  > /*InferGetServerSidePropsType은 제네릭을 이용해서 "InferGetServerSidePropsType<typeof 서버사이드렌더링함수>"와 같이 작성하면 해당 서버사이드렌더링함수의 반환값 타입을 자동으로 추론해주는 기능을 하는 Next.js의 내장 타입이다.*/
) {
  /*InferGetStaticPropsType은 제네릭을 이용해서 "InferGetStaticPropsType<typeof 정적사이트생성함수>"와 같이 작성하면 해당 정적사이트생성(SSG)함수의 반환값 타입을 자동으로 추론해주는 기능을 하는 Next.js의 내장 타입이다. */
  // 서버사이드 렌더링 함수를 작성하면 해당 페이지 컴포넌트는 서버사이드 렌더링 컴포넌트가 되기에 클라이언트 단에서 작성 가능한 코드를 직접적으로 작성할 수 없다
  // console.log(window) // 와 같은 코드는 직접 작성할 수 없음!

  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {recommendBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {allBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
