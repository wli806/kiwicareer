export interface IMenuData {
  id: number;
  link: string;
  title: string;
  title_zh?: string;
  sub_menus?: {
      link: string;
      title: string;
      title_zh?: string;
  }[];
  mega_menus?: {
    id: number;
    title: string;
    title_zh?: string;
    sub_menus: {
        title: string;
        title_zh?: string;
        link: string;
    }[];
}[]
}