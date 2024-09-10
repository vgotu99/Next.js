// 파일명 [id].tsx = 하나의 파라미터를 갖는 경우 핸들링 가능 ex)book/1111
// 파일명 [...id].tsx = 여러개의 파라미터를 갖는 경우도 핸들링 가능 ex)book/123/0001/1102/94949 이때 console.log(id) => ['123', '0001', '1102', '94949] 이런 배열의 형태로 저장된다. / 이런 형태의 파일명은 Catch All Segmnt라고 부름
// 파일명 [[...id]].tsx = 여러개의 파라미터, '/book'과 같은 index값도 핸들링 가능) ex) /book , /book/123/0001/1102/94949 등과 같은 모든 경우에 대해서 핸들링 가능하다. / 이런 형태의 파일명은 Optional Catch All Segment라고 부름

import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  const { id } = router.query;


  return <h1>Book {id}</h1>;
}
