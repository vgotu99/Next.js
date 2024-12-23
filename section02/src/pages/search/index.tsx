import SearchableLayout from "@/components/searchable-layout";
import type { ReactNode } from "react";
import books from "@/mock/books.json";
import BookItem from "@/components/book-item";
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import fetchBooks from "@/lib/fetch-books";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const q = context.query.q
  const searchedBooks = await fetchBooks(q as string)

  return {
    props: {searchedBooks},
  };
};

const Page = ({searchedBooks}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div>
      {searchedBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
};

export default Page;

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
