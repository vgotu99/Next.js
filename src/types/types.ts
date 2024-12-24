import type { ReactNode } from "react";

export interface Children {
  children: ReactNode;
}

export interface BookData {
  id: number;
  title: string;
  subTitle: string;
  description: string;
  author: string;
  publisher: string;
  coverImgUrl: string;
}