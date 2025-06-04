import { StaticImageData } from "next/image";

export interface ICategoryItem {
  id: number;
  icon: StaticImageData;
  title: string;
  title_zh?: string;
  count: string;
  bg_clr?: string;
  link?: string;
}

export interface category_dropdown {
  id: number;
  category_items: ICategoryItem[];
}[]

// category two 
export interface ICategoryTwo {
  id: number;
  icon: StaticImageData;
  title: React.JSX.Element;
  vacancy?: number;
  sub_title?: string;
  bg?: string;
  bg_img?: StaticImageData;
  df?: boolean;
}