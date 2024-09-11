import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import style from './searchable-layout.module.css'

export default function SearchableLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const q = router.query.q as string;

  useEffect(() => {
    setSearch(q || "");
  }, [q]);
  // [q]는 q의 값이 바뀌었을 때

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    // React에서 발생한 ChangeEvent 객체타입인데 HTML의 Input element에서 발생한 타입이다. 라는 의미
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    if (!search || q === search) return;
    // search state에 값이 없거나 q의 값이 search state의 값과 같을 때(검색어가 변하지 않았을 때)는 함수를 실행하지 않고 return
    router.push(`/search?q=${search}`);
  };

  const onKeyDown = (e : React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit()
    }
  };

  return (
    <div>
      <div className={style.searchbar_container}>
        <input
          onKeyDown={onKeyDown}
          onChange={onChangeSearch}
          value={search}
          placeholder="검색어를 입력해주세요 ..."
        />
        <button onClick={onSubmit}>검색</button>
      </div>
      {children}
    </div>
  );
}
