import { useRouter } from "next/router";

const Page = () => {
  const router = useRouter();
  const { q } = router.query;

  return <div>search {q}</div>;
};

export default Page;
