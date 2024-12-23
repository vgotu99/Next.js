import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import type { ReactNode } from "react";
import BookItem from "@/components/book-item";
import type { InferGetServerSidePropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";

// 인덱스 페이지인 Home 컴포넌트보다 먼저 실행되어 사전 렌더링되도록 하는 함수, 따라서 서버측에서 딱 한번만 실행되는 함수이다. 따라서 클라이언트측에서 사용하려면 리턴한 props의 값을 전달받아 사용해야한다.
export const getServerSideProps = async () => {
  // 서버측에서 실행되는 함수이기 때문에 클라이언트측에서 동작하는 코드는 작성할 수 없다.
  // 해당 페이지 컴포넌트에서 사용할 데이터를 미리 페치해오는데 사용하면 될 거 같다!

  // 아래는 기존 직렬방식으로 하나씩 실행하는 구조
  // const allBooks = await fetchBooks();
  // const recommendBooks = await fetchRandomBooks();
  const [allBooks, recommendBooks] = await Promise.all([
    // Promise.all method는 인수로 전달한 배열 안에 들어있는 모든 비동기 함수들을 동시에(병렬로) 실행시켜준다!
    fetchBooks(),
    fetchRandomBooks(),
  ]);
  

  // 리턴값은 props라는 프로퍼티를 포함하는 객체여야한다.
  return {
    props: {
      allBooks,
      recommendBooks,
    },
  };
};

export default function Home(
  {
    allBooks,
    recommendBooks,
  }: InferGetServerSidePropsType<
    typeof getServerSideProps
  > /*InferGetServerSidePropsType은 제네릭을 이용해서 "InferGetServerSidePropsType<typeof 서버사이드렌더링함수>"와 같이 작성하면 해당 서버사이드렌더링함수의 반환값 타입을 자동으로 추론해주는 기능을 하는 Next.js의 내장 타입이다.*/
) {
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
