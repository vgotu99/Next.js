import Link from "next/link";
import { ReactNode } from "react";
import style from "./global-layout.module.css";

interface GlobalLayoutProps {
  children: ReactNode;
}

const GlobalLayout = ({ children }: GlobalLayoutProps) => {
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
