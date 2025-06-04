import { StaticImageData } from "next/image";

export interface how_works_type {
  id: number;
  icon: StaticImageData;
  title: string;
  title_zh?: string;
  sub_title: string;
  sub_title_zh?: string;
  icon_white: StaticImageData;
}[]