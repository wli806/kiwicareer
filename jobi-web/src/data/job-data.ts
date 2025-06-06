import job_img_1 from '@/assets/images/logo/media_22.png';
import job_img_2 from '@/assets/images/logo/media_23.png';
import job_img_3 from '@/assets/images/logo/media_24.png';
import job_img_4 from '@/assets/images/logo/media_25.png';
import job_img_5 from '@/assets/images/logo/media_26.png';
import job_img_6 from '@/assets/images/logo/media_33.png';
import job_img_7 from '@/assets/images/logo/media_34.png';
import job_img_8 from '@/assets/images/logo/media_35.png';
import job_img_9 from '@/assets/images/logo/media_36.png';
import job_img_10 from '@/assets/images/logo/media_43.png';
import job_img_11 from '@/assets/images/logo/media_44.png';
import job_img_12 from '@/assets/images/logo/media_45.png';
import job_img_13 from '@/assets/images/logo/media_46.png';
import job_img_14 from '@/assets/images/logo/media_47.png';
import job_img_15 from '@/assets/images/logo/media_48.png';
import job_img_16 from '@/assets/images/logo/media_49.png';
import job_img_17 from '@/assets/images/logo/media_50.png';
import job_img_18 from '@/assets/images/logo/media_51.png';
import job_img_19 from '@/assets/images/logo/media_52.png';
import job_img_20 from '@/assets/images/logo/media_53.png';
import job_img_21 from '@/assets/images/logo/media_54.png';
import job_img_22 from '@/assets/images/logo/media_55.png';
import job_img_23 from '@/assets/images/logo/media_56.png';
import job_img_24 from '@/assets/images/logo/media_57.png';
import job_img_25 from '@/assets/images/logo/media_58.png';
import job_img_26 from '@/assets/images/logo/media_59.png';
import job_img_27 from '@/assets/images/logo/media_60.png';
import job_img_28 from '@/assets/images/logo/media_61.png';

import { StaticImageData } from "next/image";

interface IJobTypeOri {
  id: number;
  logo: StaticImageData;
  title: string;
  duration: string;
  date: string;
  company: string;
  location: string;
  category: string[];
  tags?: string[];
  experience: string;
  salary: number;
  salary_duration: string;
  english_fluency: string;
  overview: string;
}


const job_data:IJobTypeOri[] = [
  {
    id:1,
    logo:job_img_1,
    title:'Developer & expert in java c++',
    duration:'Fulltime',
    date:'18 Jul 2024',
    company:'slack',
    location:'Spain, Bercelona',
    category:['Developer','Coder'],
    experience:'Fresher',
    salary:900,
    salary_duration:'Monthly',
    tags:['java','developer'],
    english_fluency:'Fluent',
    overview:"When team members told us they needed more flexibility around where and how they worked, we acted, creating two options to accommodate two different styles of work. One non-negotiable principle along the way? We had to retain our deep culture of collaboration, both among ourselves and with our clients. Introducing Work From Near and Work From Anywhere at WillowTree. Please indicate which location(s) you're interested."
  },
  {
    id:2,
    logo:job_img_2,
    title:'Animator & Expert in maya 3D',
    duration:'Part time',
    date:'25 Jul 2024',
    company:'google',
    location:'USA,New York',
    category:['Finance','Accounting'],
    experience:'Intermediate',
    salary:100,
    salary_duration:'Weekly',
    tags:['finance','accounting'],
    english_fluency:'Conversational',
    overview:"When team members told us they needed more flexibility around where and how they worked, we acted, creating two options to accommodate two different styles of work. One non-negotiable principle along the way? We had to retain our deep culture of collaboration, both among ourselves and with our clients. Introducing Work From Near and Work From Anywhere at WillowTree. Please indicate which location(s) you're interested."
  },
  {
    id:3,
    logo:job_img_3,
    title:'Marketing Specialist in SEO & SMM',
    duration:'Part time',
    date:'25 Jan 2024',
    company:'pinterest',
    location:'USA,Alaska',
    category:['Design','Artist'],
    experience:'No-Experience',
    salary:50,
    salary_duration:'Hourly',
    tags:['design','seo'],
    english_fluency:'Basic',
    overview:"When team members told us they needed more flexibility around where and how they worked, we acted, creating two options to accommodate two different styles of work. One non-negotiable principle along the way? We had to retain our deep culture of collaboration, both among ourselves and with our clients. Introducing Work From Near and Work From Anywhere at WillowTree. Please indicate which location(s) you're interested."
  },
  {
    id:4,
    logo:job_img_4,
    title:'Developer & Expert in javascript c+',
    duration:'Fulltime',
    date:'10 Feb 2024',
    company:'instagram',
    location:'USA,California',
    category:['Application','Marketing'],
    experience:'Internship',
    salary:800,
    salary_duration:'Monthly',
    tags:['javascript','developer'],
    english_fluency:'Native/Bilingual',
    overview:"When team members told us they needed more flexibility around where and how they worked, we acted, creating two options to accommodate two different styles of work. One non-negotiable principle along the way? We had to retain our deep culture of collaboration, both among ourselves and with our clients. Introducing Work From Near and Work From Anywhere at WillowTree. Please indicate which location(s) you're interested."
  },
  {
    id:5,
    logo:job_img_5,
    title:'Lead & Product Designer',
    duration:'Fulltime',
    date:'15 Feb 2024',
    company:'Linkedin',
    location:'UK,London',
    category:['Finance','Business'],
    experience:'Expert',
    salary:1200,
    salary_duration:'Monthly',
    tags:['designer','finance'],
    english_fluency:'Fluent',
    overview:"When team members told us they needed more flexibility around where and how they worked, we acted, creating two options to accommodate two different styles of work. One non-negotiable principle along the way? We had to retain our deep culture of collaboration, both among ourselves and with our clients. Introducing Work From Near and Work From Anywhere at WillowTree. Please indicate which location(s) you're interested."
  },
  {
    id: 6,
    logo: job_img_6,
    title: 'Web Developer',
    duration: 'Fixed-Price',
    date: '21 Aug 2024',
    company: 'Microsoft',
    location: 'USA, Mountain View',
    category: ['Developer', 'Web'],
    experience:'Fresher',
    salary: 1500,
    salary_duration: 'Monthly',
    tags: ['web', 'frontend'],
    english_fluency:'Conversational',
    overview:"When team members told us they needed more flexibility around where and how they worked, we acted, creating two options to accommodate two different styles of work. One non-negotiable principle along the way? We had to retain our deep culture of collaboration, both among ourselves and with our clients. Introducing Work From Near and Work From Anywhere at WillowTree. Please indicate which location(s) you're interested."
  },
  {
    id: 7,
    logo: job_img_7,
    title: 'Data Scientist',
    duration: 'Freelance',
    date: '12 Mar 2024',
    company: 'Amazon',
    location: 'Germany, Berlin',
    category: ['Data', 'Scientist'],
    experience: 'Intermediate',
    salary: 2500,
    salary_duration: 'Weekly',
    tags: ['data', 'analytics'],
    english_fluency:'Basic',
    overview:"When team members told us they needed more flexibility around where and how they worked, we acted, creating two options to accommodate two different styles of work. One non-negotiable principle along the way? We had to retain our deep culture of collaboration, both among ourselves and with our clients. Introducing Work From Near and Work From Anywhere at WillowTree. Please indicate which location(s) you're interested."
  },
  {
    id: 8,
    logo: job_img_8,
    title: 'UX/UI Designer',
    duration: 'Fulltime',
    date: '05 Nov 2024',
    company: 'Apple',
    location: 'USA, Cupertino',
    category: ['Designer', 'UX/UI'],
    experience: 'No-Experience',
    salary: 1800,
    salary_duration: 'Monthly',
    tags: ['ui', 'ux', 'design'],
    english_fluency:'Native/Bilingual',
    overview:"When team members told us they needed more flexibility around where and how they worked, we acted, creating two options to accommodate two different styles of work. One non-negotiable principle along the way? We had to retain our deep culture of collaboration, both among ourselves and with our clients. Introducing Work From Near and Work From Anywhere at WillowTree. Please indicate which location(s) you're interested."
  },
  {
    id: 9,
    logo: job_img_9,
    title: 'Marketing Manager',
    duration: 'Fulltime',
    date: '30 Jan 2024',
    company: 'Facebook',
    location: 'USA, Menlo Park',
    category: ['Marketing', 'Manager'],
    experience: 'Internship',
    salary: 3000,
    salary_duration: 'Monthly',
    tags: ['marketing', 'management'],
    english_fluency:'Fluent',
    overview:"When team members told us they needed more flexibility around where and how they worked, we acted, creating two options to accommodate two different styles of work. One non-negotiable principle along the way? We had to retain our deep culture of collaboration, both among ourselves and with our clients. Introducing Work From Near and Work From Anywhere at WillowTree. Please indicate which location(s) you're interested."
  },
  {
    id: 10,
    logo: job_img_10,
    title: 'Software Engineer',
    duration: 'Part time',
    date: '15 Sep 2024',
    company: 'Microsoft',
    location: 'USA, Redmond',
    category: ['Developer', 'Engineer'],
    experience: 'Expert',
    salary: 200,
    salary_duration: 'Weekly',
    tags: ['software', 'engineering'],
    english_fluency:'Conversational',
    overview:"When team members told us they needed more flexibility around where and how they worked, we acted, creating two options to accommodate two different styles of work. One non-negotiable principle along the way? We had to retain our deep culture of collaboration, both among ourselves and with our clients. Introducing Work From Near and Work From Anywhere at WillowTree. Please indicate which location(s) you're interested."
  },
  {
    id: 11,
    logo: job_img_11,
    title: 'Content Writer',
    duration: 'Freelance',
    date: '10 Apr 2024',
    company: 'Upwork',
    location: 'UK, Cupertino',
    category: ['Writer', 'Content'],
    experience: 'Internship',
    salary: 800,
    salary_duration: 'Weekly',
    tags: ['writing', 'blogging'],
    english_fluency:'Basic',
    overview:"When team members told us they needed more flexibility around where and how they worked, we acted, creating two options to accommodate two different styles of work. One non-negotiable principle along the way? We had to retain our deep culture of collaboration, both among ourselves and with our clients. Introducing Work From Near and Work From Anywhere at WillowTree. Please indicate which location(s) you're interested."
  },
  {
    id: 12,
    logo: job_img_12,
    title: 'Graphic Designer',
    duration: 'Part time',
    date: '25 Jun 2024',
    company: 'Adobe',
    location: 'USA, San Jose',
    category: ['Designer', 'Graphic'],
    experience: 'Expert',
    salary: 1800,
    salary_duration: 'Monthly',
    tags: ['graphic', 'illustration'],
    english_fluency:'Native/Bilingual',
    overview:"When team members told us they needed more flexibility around where and how they worked, we acted, creating two options to accommodate two different styles of work. One non-negotiable principle along the way? We had to retain our deep culture of collaboration, both among ourselves and with our clients. Introducing Work From Near and Work From Anywhere at WillowTree. Please indicate which location(s) you're interested."
  },
  {
    id: 13,
    logo: job_img_13,
    title: 'Accountant',
    duration: 'Fulltime',
    date: '08 Dec 2024',
    company: 'Deloitte',
    location: 'USA, New York',
    category: ['Finance', 'Accounting'],
    experience: 'No-Experience',
    salary: 2500,
    salary_duration: 'Monthly',
    tags: ['accounting', 'finance'],
    english_fluency:'Fluent',
    overview:"When team members told us they needed more flexibility around where and how they worked, we acted, creating two options to accommodate two different styles of work. One non-negotiable principle along the way? We had to retain our deep culture of collaboration, both among ourselves and with our clients. Introducing Work From Near and Work From Anywhere at WillowTree. Please indicate which location(s) you're interested."
  },
  {
    id: 14,
    logo: job_img_14,
    title: 'Product Manager',
    duration: 'Fixed-Price',
    date: '27 Mar 2024',
    company: 'Tesla',
    location: 'USA, Palo Alto',
    category: ['Management', 'Product'],
    experience:'Fresher',
    salary: 3500,
    salary_duration: 'Monthly',
    tags: ['product', 'management'],
    english_fluency:'Conversational',
    overview:"When team members told us they needed more flexibility around where and how they worked, we acted, creating two options to accommodate two different styles of work. One non-negotiable principle along the way? We had to retain our deep culture of collaboration, both among ourselves and with our clients. Introducing Work From Near and Work From Anywhere at WillowTree. Please indicate which location(s) you're interested."
  },
  // copy
  {
    id:15,
    logo:job_img_15,
    title:'Data Science Expert With Algorithm',
    duration:'Fulltime',
    date:'18 Jul 2024',
    company:'slack',
    location:'Spain, Bercelona',
    category:['Developer','Coder'],
    experience:'Fresher',
    salary:450,
    salary_duration:'Monthly',
    tags:['java','developer'],
    english_fluency:'Basic',
    overview:"When team members told us they needed more flexibility around where and how they worked, we acted, creating two options to accommodate two different styles of work. One non-negotiable principle along the way? We had to retain our deep culture of collaboration, both among ourselves and with our clients. Introducing Work From Near and Work From Anywhere at WillowTree. Please indicate which location(s) you're interested."
  },
  {
    id:16,
    logo:job_img_16,
    title:'	Entry Level Software Developer',
    duration:'Part time',
    date:'25 Jul 2024',
    company:'google',
    location:'USA,New York',
    category:['Finance','Accounting'],
    experience:'Intermediate',
    salary:500,
    salary_duration:'Weekly',
    tags:['finance','accounting'],
    english_fluency:'Native/Bilingual',
    overview:"When team members told us they needed more flexibility around where and how they worked, we acted, creating two options to accommodate two different styles of work. One non-negotiable principle along the way? We had to retain our deep culture of collaboration, both among ourselves and with our clients. Introducing Work From Near and Work From Anywhere at WillowTree. Please indicate which location(s) you're interested."
  },
  {
    id:17,
    logo:job_img_17,
    title:'Junior Front End Developer',
    duration:'Part time',
    date:'25 Jan 2024',
    company:'pinterest',
    location:'USA,Alaska',
    category:['Design','Artist'],
    experience:'No-Experience',
    salary:350,
    salary_duration:'Hourly',
    tags:['design','seo'],
    english_fluency:'Conversational',
    overview:"When team members told us they needed more flexibility around where and how they worked, we acted, creating two options to accommodate two different styles of work. One non-negotiable principle along the way? We had to retain our deep culture of collaboration, both among ourselves and with our clients. Introducing Work From Near and Work From Anywhere at WillowTree. Please indicate which location(s) you're interested."
  },
  {
    id:18,
    logo:job_img_18,
    title:'Entry Level Network Engineer',
    duration:'Fulltime',
    date:'10 Feb 2024',
    company:'instagram',
    location:'USA,California',
    category:['Application','Marketing'],
    experience:'Internship',
    salary:980,
    salary_duration:'Monthly',
    tags:['javascript','developer'],
    english_fluency:'Conversational',
    overview:"When team members told us they needed more flexibility around where and how they worked, we acted, creating two options to accommodate two different styles of work. One non-negotiable principle along the way? We had to retain our deep culture of collaboration, both among ourselves and with our clients. Introducing Work From Near and Work From Anywhere at WillowTree. Please indicate which location(s) you're interested."
  },
  {
    id:19,
    logo:job_img_19,
    title:'Embedded Software Engineer',
    duration:'Fulltime',
    date:'15 Feb 2024',
    company:'Linkedin',
    location:'UK,London',
    category:['Finance','Business'],
    experience:'Expert',
    salary:1650,
    salary_duration:'Monthly',
    tags:['designer','finance'],
    english_fluency:'Basic',
    overview:"When team members told us they needed more flexibility around where and how they worked, we acted, creating two options to accommodate two different styles of work. One non-negotiable principle along the way? We had to retain our deep culture of collaboration, both among ourselves and with our clients. Introducing Work From Near and Work From Anywhere at WillowTree. Please indicate which location(s) you're interested."
  },
  {
    id: 20,
    logo: job_img_20,
    title: 'Application Security Engineer',
    duration: 'Fixed-Price',
    date: '21 Aug 2024',
    company: 'Microsoft',
    location: 'USA, Mountain View',
    category: ['Developer', 'Web'],
    experience:'Fresher',
    salary: 1200,
    salary_duration: 'Monthly',
    tags: ['web', 'frontend'],
    english_fluency:'Native/Bilingual',
    overview:"When team members told us they needed more flexibility around where and how they worked, we acted, creating two options to accommodate two different styles of work. One non-negotiable principle along the way? We had to retain our deep culture of collaboration, both among ourselves and with our clients. Introducing Work From Near and Work From Anywhere at WillowTree. Please indicate which location(s) you're interested."
  },
  {
    id: 21,
    logo: job_img_21,
    title: 'New Grad Software Engineer',
    duration: 'Freelance',
    date: '12 Mar 2024',
    company: 'Amazon',
    location: 'Germany, Berlin',
    category: ['Data', 'Scientist'],
    experience: 'Intermediate',
    salary: 2300,
    salary_duration: 'Weekly',
    tags: ['data', 'analytics'],
    english_fluency:'Fluent',
    overview:"When team members told us they needed more flexibility around where and how they worked, we acted, creating two options to accommodate two different styles of work. One non-negotiable principle along the way? We had to retain our deep culture of collaboration, both among ourselves and with our clients. Introducing Work From Near and Work From Anywhere at WillowTree. Please indicate which location(s) you're interested."
  },
  {
    id: 22,
    logo: job_img_22,
    title: 'Machine Learning Engineer',
    duration: 'Fulltime',
    date: '05 Nov 2024',
    company: 'Apple',
    location: 'USA, Cupertino',
    category: ['Designer', 'UX/UI'],
    experience: 'No-Experience',
    salary: 1700,
    salary_duration: 'Monthly',
    tags: ['ui', 'ux', 'design'],
    english_fluency:'Conversational',
    overview:"When team members told us they needed more flexibility around where and how they worked, we acted, creating two options to accommodate two different styles of work. One non-negotiable principle along the way? We had to retain our deep culture of collaboration, both among ourselves and with our clients. Introducing Work From Near and Work From Anywhere at WillowTree. Please indicate which location(s) you're interested."
  },
  {
    id: 23,
    logo: job_img_23,
    title: 'Entry Level Software Engineer',
    duration: 'Fulltime',
    date: '30 Jan 2024',
    company: 'Facebook',
    location: 'USA, Menlo Park',
    category: ['Marketing', 'Manager'],
    experience: 'Internship',
    salary: 3000,
    salary_duration: 'Monthly',
    tags: ['marketing', 'management'],
    english_fluency:'Fluent',
    overview:"When team members told us they needed more flexibility around where and how they worked, we acted, creating two options to accommodate two different styles of work. One non-negotiable principle along the way? We had to retain our deep culture of collaboration, both among ourselves and with our clients. Introducing Work From Near and Work From Anywhere at WillowTree. Please indicate which location(s) you're interested."
  },
  {
    id: 24,
    logo: job_img_24,
    title: 'VP of Product Management',
    duration: 'Part time',
    date: '15 Sep 2024',
    company: 'Microsoft',
    location: 'USA, Redmond',
    category: ['Developer', 'Engineer'],
    experience: 'Expert',
    salary: 200,
    salary_duration: 'Weekly',
    tags: ['software', 'engineering'],
    english_fluency:'Basic',
    overview:"When team members told us they needed more flexibility around where and how they worked, we acted, creating two options to accommodate two different styles of work. One non-negotiable principle along the way? We had to retain our deep culture of collaboration, both among ourselves and with our clients. Introducing Work From Near and Work From Anywhere at WillowTree. Please indicate which location(s) you're interested."
  },
  {
    id: 25,
    logo: job_img_25,
    title: 'Technical Project Manager',
    duration: 'Freelance',
    date: '10 Apr 2024',
    company: 'Upwork',
    location: 'UK, Cupertino',
    category: ['Writer', 'Content'],
    experience: 'Internship',
    salary: 800,
    salary_duration: 'Weekly',
    tags: ['writing', 'blogging'],
    english_fluency:'Native/Bilingual',
    overview:"When team members told us they needed more flexibility around where and how they worked, we acted, creating two options to accommodate two different styles of work. One non-negotiable principle along the way? We had to retain our deep culture of collaboration, both among ourselves and with our clients. Introducing Work From Near and Work From Anywhere at WillowTree. Please indicate which location(s) you're interested."
  },
  {
    id: 26,
    logo: job_img_26,
    title: 'Business Account Manager',
    duration: 'Part time',
    date: '25 Jun 2024',
    company: 'Adobe',
    location: 'USA, San Jose',
    category: ['Designer', 'Graphic'],
    experience: 'Expert',
    salary: 1800,
    salary_duration: 'Monthly',
    tags: ['graphic', 'illustration'],
    english_fluency:'Fluent',
    overview:"When team members told us they needed more flexibility around where and how they worked, we acted, creating two options to accommodate two different styles of work. One non-negotiable principle along the way? We had to retain our deep culture of collaboration, both among ourselves and with our clients. Introducing Work From Near and Work From Anywhere at WillowTree. Please indicate which location(s) you're interested."
  },
  {
    id: 27,
    logo: job_img_27,
    title: 'Learning and Development Manager',
    duration: 'Fulltime',
    date: '13 Oct 2024',
    company: 'Deloitte',
    location: 'USA, New York',
    category: ['Finance', 'Accounting'],
    experience: 'No-Experience',
    salary: 2500,
    salary_duration: 'Monthly',
    tags: ['accounting', 'finance'],
    english_fluency:'Conversational',
    overview:"When team members told us they needed more flexibility around where and how they worked, we acted, creating two options to accommodate two different styles of work. One non-negotiable principle along the way? We had to retain our deep culture of collaboration, both among ourselves and with our clients. Introducing Work From Near and Work From Anywhere at WillowTree. Please indicate which location(s) you're interested."
  },
  {
    id: 28,
    logo: job_img_28,
    title: 'Chief Human Resource Officer',
    duration: 'Fixed-Price',
    date: '20 Mar 2024',
    company: 'Tesla',
    location: 'USA, Palo Alto',
    category: ['Management', 'Product'],
    experience:'Fresher',
    salary: 3500,
    salary_duration: 'Monthly',
    tags: ['product', 'management'],
    english_fluency:'Basic',
    overview:"When team members told us they needed more flexibility around where and how they worked, we acted, creating two options to accommodate two different styles of work. One non-negotiable principle along the way? We had to retain our deep culture of collaboration, both among ourselves and with our clients. Introducing Work From Near and Work From Anywhere at WillowTree. Please indicate which location(s) you're interested."
  }
]

export default job_data;