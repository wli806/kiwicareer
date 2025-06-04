import cate_icon_1 from '@/assets/images/icon/icon_63.svg';
import cate_icon_2 from '@/assets/images/icon/icon_64.svg';
import cate_icon_3 from '@/assets/images/icon/icon_65.svg';
import cate_icon_4 from '@/assets/images/icon/icon_68.svg';
import cate_icon_5 from '@/assets/images/icon/icon_66.svg';
import cate_icon_6 from '@/assets/images/icon/icon_67.svg';
import type { category_dropdown } from '@/types/category-type';

const category_dropdown:category_dropdown[] = [
  {
    id:1,
    category_items:[
      {
        id:1,
        icon:cate_icon_1,
        title:'Design',
        title_zh: '设计',
        count:'12k+',
        bg_clr:'#EAFBFD',
        link:'/job-grid-v2?category=Design+%26+Architecture'
      },
      {
        id:2,
        icon:cate_icon_2,
        title:'Development',
        title_zh: '开发',
        count:'7k+',
        bg_clr:'#FFFAEC',
        link:'/job-grid-v2?category=Information+%26+Communication+Technology'
      },
      {
        id:3,
        icon:cate_icon_3,
        title:'Consulting',
        title_zh: '咨询',
        count:'310k+',
        bg_clr:'#FFEBFB',
        link:'/job-grid-v2?category=Consulting+%26+Strategy'
      },
    ]
  },
  {
    id:2,
    category_items:[
      {
        id:4,
        icon:cate_icon_4,
        title:'Marketing',
        title_zh: '营销',
        count:'420k+',
        bg_clr:'#E8F7E9',
        link:'/job-grid-v2?category=Marketing+%26+Communications'
      },
      {
        id:5,
        icon:cate_icon_5,
        title:'Trading',
        title_zh: '销售',
        count:'3k+',
        bg_clr:'#F7F5FF',
        link:'/job-grid-v2?category=Trades+%26+Services'
      },
      {
        id:6,
        icon:cate_icon_6,
        title:'Accounting',
        title_zh: '会计',
        count:'150k+',
        bg_clr:'#FFF3EA',
        link:'/job-grid-v2?category=Accounting'
      },
    ]
  }
]

export default category_dropdown;