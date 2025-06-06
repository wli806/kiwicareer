import icon_1 from "@/assets/images/icon/icon_08.svg";
import icon_2 from "@/assets/images/icon/icon_09.svg";
import icon_3 from "@/assets/images/icon/icon_10.svg";
import icon_W_1 from "@/assets/images/icon/icon_43.svg";
import icon_W_2 from "@/assets/images/icon/icon_45.svg";
import icon_W_3 from "@/assets/images/icon/icon_46.svg";
import { how_works_type } from "../types/how-it-works-type";

export const how_works_data: how_works_type[] = [
  {
    id: 1,
    icon: icon_1,
    icon_white: icon_W_1,
    title: "Create Account",
    title_zh: "创建账户",
    sub_title: "It’s very easy to open an account and start your journey.",
    sub_title_zh: "创建账户非常简单，开启你的求职之旅。",
  },
  {
    id: 2,
    icon: icon_2,
    icon_white: icon_W_2,
    title: "Complete your profile",
    title_zh: "完善个人资料",
    sub_title:
      "Complete your profile with all the info to get attention of client.",
    sub_title_zh: "完善个人资料，吸引HR的注意。",
  },
  {
    id: 3,
    icon: icon_3,
    icon_white: icon_W_3,
    title: "Apply job",
    title_zh: "申请职位",
    sub_title:
      "Apply & get your preferable jobs with all the requirements and get it.",
    sub_title_zh: "申请你理想的职位，满足要求并迅速获取机会。",
  },
];