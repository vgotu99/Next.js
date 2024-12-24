// !!!! 파일명 !!!!
// [ ] 안에 지정한 키 네임으로 router.query에 대응되어 보관됨
// [id].tsx: /book/{id}에 대응할 수 있는 동적 라우팅 페이지, /book 경로는 대응 불가, index.tsx 파일 필요
// => /book/123 => {id: '123}
// [...id].tsx(catch all segment): /book/{id}/{id}/{id}에 대응할 수 있는 동적 라우팅 페이지, /book 경로는 대응 불가, index.tsx 파일 필요
// => /book/123/456/789/asd => {id: ['123', '456', 'asd']}
// [[...id]].tsx(optional catch all segment): /book과 /book/{id}/{id}/{id}에 대응할 수 있는 동적 라우팅 페이지, /book 경로 대응 가능, index.tsx 파일 필요 x
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import style from "./[id].module.css";
import fetchOneBook from "@/lib/fetch-one-book";
import { useRouter } from "next/router";
import Head from "next/head";

// export const getServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
//   const id = context.params!.id;
//   const specificBook = await fetchOneBook(Number(id));

//   return {
//     props: {
//       specificBook,
//     },
//   };
// };

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
      { params: { id: "4" } },
    ],
    fallback: true, // 예외상황에 대비하는 대비책, 보험과 같은 기능을함, 현재는 paths에 없는 params로 접속 시 어떻게 할 것인지 결정하는 대비책
    // false: 빌드 시에 paths에 지정해둔 경로만 SSG, 예외는 NOT FOUND(404) 페이지를 반환
    // true: 빌드 시에 paths에 지정해둔 경로는 SSG, 지정해두지 않았던 경로는 최초에만 SSR로 동작 후 서버에 저장되어 SSG로 동작 => props(getStaticProps함수에서 사용하는 props, 결국 서버로부터 받는 데이터를 의미)가 없는 페이지를 우선 빠르게 반환하고 props를 이용하여 데이터를 포함한 페이지를 이후에 반환해준다.
    // 👆 true 결론: SSR 방식 + 데이터가 없는 폴백 상태의 페이지 반환 -> 해당 페이지에 데이터를 하이드레이션 => SSG로 동작
    // "blocking": 빌드 시에 paths에 지정해둔 경로는 SSG, 지정해두지 않았던 경로는 최초에만 SSR로 동작 후 서버에 저장되어 SSG로 동작 => SSR로 동작할 때 사전 렌더링 시간이 길어진다면 로딩이 생긴다.
    // 👆 "blocking" 결론: SSR 방식 + 온전한 페이지를 반환(로딩 존재) => SSG로 동작
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;
  const specificBook = await fetchOneBook(Number(id));

  if (!specificBook) {
    return {
      notFound: true, // 실제로 존재하지 않는 경로의 id에 접속 시 notFound 처리를 해줘야한다. 이를 통해 404.tsx를 렌더링시킬 수 있다.
    };
  }

  return {
    props: {
      specificBook,
    },
  };
};

const Page = ({
  specificBook,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  if (router.isFallback) // router.isFallback을 이용해서 getStaticPaths의 fallback 옵션이 true, 'blocking'인 경우 아직 ssg되지 않은 페이지를 ssr로 데이터를 불러오는 중인 로딩 상태를 제어할 수 있다.
    return (
      <>
        <Head>
          <title>한입 북스</title>
          <meta property="og:image" content="/thumbnail.png" />
          <meta property="og:title" content="한입 북스" />
          <meta
            property="og:description"
            content="한입 북스에 등록된 도서들을 만나보세요."
          />
        </Head> 
        {/* isFallback이 true인 경우에는 아직 데이터가 없을 때니까 기본적인 메타태그의 content라도 채워질 수 있도록 설정해줘야한다! */}
        <div>로딩중입니다...</div>
      </>
    ); 
  if (!specificBook) return "문제가 발생했습니다. 다시 시도하세요.";

  const { title, subTitle, description, author, publisher, coverImgUrl } =
    specificBook;

  return (
    <>
      <Head>
        <title>한입 북스 - {title}</title>
        <meta property="og:image" content={coverImgUrl} />
        <meta property="og:title" content={`한입 북스 - ${title}`} />
        <meta property="og:description" content={description} />
      </Head>
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
    </>
  );
};

export default Page;
