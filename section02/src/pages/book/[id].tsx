// !!!! 파일명 !!!!
// [ ] 안에 지정한 키 네임으로 router.query에 대응되어 보관됨
// [id].tsx: /book/{id}에 대응할 수 있는 동적 라우팅 페이지, /book 경로는 대응 불가, index.tsx 파일 필요
// => /book/123 => {id: '123}
// [...id].tsx(catch all segment): /book/{id}/{id}/{id}에 대응할 수 있는 동적 라우팅 페이지, /book 경로는 대응 불가, index.tsx 파일 필요
// => /book/123/456/789/asd => {id: ['123', '456', 'asd']}
// [[...id]].tsx(optional catch all segment): /book과 /book/{id}/{id}/{id}에 대응할 수 있는 동적 라우팅 페이지, /book 경로 대응 가능, index.tsx 파일 필요 x
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import style from "./[id].module.css";
import fetchOneBook from "@/lib/fetch-one-book";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = context.params!.id;
  const specificBook = await fetchOneBook(Number(id));

  return {
    props: {
      specificBook,
    },
  };
};

const Page = ({
  specificBook,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  if (!specificBook) return "문제가 발생했습니다. 다시 시도하세요!";

  const { id, title, subTitle, description, author, publisher, coverImgUrl } =
    specificBook;

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url(${coverImgUrl})` }}
      >
        <img src={coverImgUrl} alt="도서이미지" />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
  );
};

export default Page;
