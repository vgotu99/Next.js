import { useRouter } from "next/router";

// [ ] 안에 지정한 키 네임으로 router.query에 대응되어 보관됨
// [id].tsx: /book/{id}에 대응할 수 있는 동적 라우팅 페이지, /book 경로는 대응 불가, index.tsx 파일 필요
// => /book/123 => {id: '123}
// [...id].tsx(catch all segment): /book/{id}/{id}/{id}에 대응할 수 있는 동적 라우팅 페이지, /book 경로는 대응 불가, index.tsx 파일 필요
// => /book/123/456/789/asd => {id: ['123', '456', 'asd']}
// [[...id]].tsx(optional catch all segment): /book과 /book/{id}/{id}/{id}에 대응할 수 있는 동적 라우팅 페이지, /book 경로 대응 가능, index.tsx 파일 필요 x

const Page = () => {
  const router = useRouter();
  const { id } = router.query;

  return <div>Book {id}</div>;
};

export default Page;
