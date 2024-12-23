import SearchableLayout from "@/components/searchable-layout";
import { useRouter } from "next/router";
import { ReactNode } from "react";

const Page = () => {
  const router = useRouter();
  const { q } = router.query;

  return <div>search {q}</div>;
};

export default Page;

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
}