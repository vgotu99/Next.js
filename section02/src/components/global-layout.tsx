import Link from "next/link";
import style from "./global-layout.module.css";
import type { Children } from "@/types/types";

const GlobalLayout = ({ children }: Children) => {
  return (
    <div className={style.container}>
      <header className={style.header}>
        <Link href={"/"}>📚 ONEBITE BOOKS</Link>
      </header>
      <main className={style.main}>{children}</main>
      <footer className={style.footer}>제작 @vgotu99</footer>
    </div>
  );
};

export default GlobalLayout;
