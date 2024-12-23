import SearchableLayout from "@/components/searchable-layout";
import type { ReactNode } from "react";
import books from "@/mock/books.json";
import BookItem from "@/components/book-item";

const Page = () => {
  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
};

export default Page;

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
