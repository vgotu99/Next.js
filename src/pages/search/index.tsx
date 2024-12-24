import SearchableLayout from "@/components/searchable-layout";
import { useEffect, useState, type ReactNode } from "react";
import BookItem from "@/components/book-item";
import fetchBooks from "@/lib/fetch-books";
import { useRouter } from "next/router";
import { BookData } from "@/types/types";
import Head from "next/head";

// export const getServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
//   const q = context.query.q
//   const searchedBooks = await fetchBooks(q as string)

//   return {
//     props: {searchedBooks},
//   };
// };

// export const getStaticProps = async (context: GetStaticPropsContext) => {
//   const q = context.query.q; // 빌드 시에 존재할 수가 없는 쿼리스트링과 같은 값은 SSG방식에서 사용할 수 없다. 따라서 SSG방식에서 동적 값을 사용해야할 경우에는 클라이언트측 코드에서 작성해야한다.
//   const searchedBooks = await fetchBooks(q as string);

//   return {
//     props: { searchedBooks },
//   };
// };

const Page = () => {
  const [books, setBooks] = useState<BookData[]>([]);
  const router = useRouter();
  const { q } = router.query;

  const fetchSearchResult = async () => {
    const data = await fetchBooks(q as string);
    setBooks(data);
  };

  useEffect(() => {
    if (q) {
      fetchSearchResult();
    }
  }, [q]);

  return (
    <>
    <Head>
        <title>한입 북스 - "{q}" 검색 결과</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content={`한입 북스 - "${q}" 검색 결과`} />
        <meta
          property="og:description"
          content="한입 북스에 등록된 도서들을 만나보세요."
        />
      </Head>
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
    </>
  );
};

export default Page;

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
