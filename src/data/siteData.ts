import { ArrowUpRight, Briefcase, Compass, Cpu, Globe2, Layers3, Megaphone, PencilLine, Smartphone, Sparkles, Video, Wrench } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { assets } from '../config/assets';

export type Service = {
  title: string;
  summary: string;
  list: string[];
  image: string;
  icon: LucideIcon;
};

export type Founder = {
  name: string;
  role: string;
  responsibilities: string[];
  bio: string;
  image: string;
};

export const navItems = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/faqs', label: 'FAQs' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/contact', label: 'Contact' },
];

export const services: Service[] = [
  {
    title: 'Web Development',
    summary: 'Modern business websites, landing pages and digital experiences built for clarity, trust and growth.',
    list: ['Business Websites', 'Custom Website Development', 'Landing Pages', 'E-commerce Websites', 'Website Redesign', 'Frontend Development', 'UI/UX Design'],
    image: assets.services.webDevelopment,
    icon: Globe2,
  },
  {
    title: 'App Development',
    summary: 'User-first mobile experiences designed to perform beautifully across iOS, Android and cross-platform products.',
    list: ['Android Applications', 'iOS Applications', 'React Native Development', 'Mobile Application UI', 'Mobile App Design'],
    image: assets.services.appDevelopment,
    icon: Smartphone,
  },
  {
    title: 'UI/UX Design',
    summary: 'Research-led product experiences that make digital services easier to understand, navigate and use.',
    list: ['Product Discovery', 'UX Research', 'Wireframing', 'Interface Design', 'Prototyping', 'Design Systems'],
    image: assets.services.uiUxDesign,
    icon: Layers3,
  },
  {
    title: 'Graphic Design & Branding',
    summary: 'Identity systems and creative assets that bring structure, consistency and recognition to every touchpoint.',
    list: ['Logo Design', 'Brand Identity', 'Social Media Graphics', 'Marketing Creatives', 'Branding Materials'],
    image: assets.services.graphicDesign,
    icon: PencilLine,
  },
  {
    title: 'Video Editing & Content Creation',
    summary: 'Short-form creative production that transforms complex messages into compelling, engaging stories.',
    list: ['Professional Video Editing', 'Social Media Reels', 'Promotional Videos', 'Short-form Content', 'Content Creation'],
    image: assets.services.videoEditing,
    icon: Video,
  },
  {
    title: 'Digital Marketing',
    summary: 'Strategy, content and audience insight that help brands reach the right people at the right stage.',
    list: ['Social Media Management', 'Marketing Strategy', 'Campaign Planning', 'Client and Audience Research', 'Content Marketing'],
    image: assets.services.digitalMarketing,
    icon: Megaphone,
  },
];

export const whyChooseUs = [
  'Premium digital strategy rooted in business goals and user clarity.',
  'Design systems that scale without losing brand quality or momentum.',
  'A collaborative process built around clarity, speed and measurable impact.',
  'Thoughtful execution across web, mobile, creative and marketing touchpoints.',
];

export const processSteps = [
  { step: '01', title: 'Discover', text: 'We learn your market, audience and business objectives before any creative direction begins.' },
  { step: '02', title: 'Design', text: 'We translate strategy into elegant interfaces, brand systems and conversion-focused experiences.' },
  { step: '03', title: 'Develop', text: 'Our team builds robust digital products with clean code and scalable front-end architecture.' },
  { step: '04', title: 'Launch', text: 'We refine, test and launch polished experiences that are ready for real-world usage.' },
];

export const founders: Founder[] = [
  {
    name: 'Junaid Ali',
    role: 'Co-Founder | Technology & Development',
    responsibilities: ['Web Development', 'Frontend Development', 'App Development', 'React Native', 'UI/UX Design', 'Technical Solutions', 'Project Development'],
    bio: 'Junaid leads technology and development at UMJ Digital, focusing on building modern websites, mobile applications and user-friendly digital experiences.',
    image: assets.founders.junaid,
  },
  {
    name: 'Umer',
    role: 'Co-Founder | Marketing & Business Growth',
    responsibilities: ['Social Media Management', 'Marketing', 'Client Research', 'Market Research', 'Lead Generation', 'Client Outreach', 'Business Development'],
    bio: 'Umer focuses on marketing, business growth and client acquisition at UMJ Digital, researching potential clients and building meaningful business relationships.',
    image: assets.founders.umer,
  },
  {
    name: 'Muzammil',
    role: 'Co-Founder | Creative & Media Production',
    responsibilities: ['Video Editing', 'Graphic Design', 'Reels Creation', 'Content Creation', 'Social Media Content', 'Creative Production', 'Visual Branding'],
    bio: 'Muzammil leads creative and media production, producing engaging videos, professional graphics and high-quality visual content.',
    image: assets.founders.muzammil,
  },
];

export const featuredProjects = [
  {
    title: 'Ahmed Engineering Company',
    category: 'Corporate Website',
    description: 'A professional digital presence for a business operating in the engineering sector, designed to showcase trust, capability and service clarity.',
    image: assets.portfolio.ahmedEngineering,
    link: 'https://ahmedengineeringcompany.vercel.app/',
    tag: 'Real project',
  },
  {
    title: 'Mobile Application Design',
    category: 'Concept Showcase',
    description: 'A concept app system built around streamlined onboarding, product discovery and conversion-focused dashboards.',
    image: assets.portfolio.mobileApp,
    link: '#',
    tag: 'Sample work',
  },
  {
    title: 'Graphic Design & Branding',
    category: 'Creative Identity',
    description: 'A premium visual identity showcase featuring typography, brand systems, campaign collateral and digital marketing art direction.',
    image: assets.portfolio.graphicDesign,
    link: '#',
    tag: 'Concept work',
  },
  {
    title: 'Video Editing & Reels',
    category: 'Content Production',
    description: 'Fast-paced storytelling visuals for social-first campaigns, product reveal edits and high-performing short-form reels.',
    image: assets.portfolio.videoEditing,
    link: '#',
    tag: 'Sample work',
  },
  {
    title: 'Digital Marketing',
    category: 'Campaign Strategy',
    description: 'Visuals and messaging concepts created to support audience growth, channel strategy and brand positioning across digital platforms.',
    image: assets.portfolio.digitalMarketing,
    link: '#',
    tag: 'Concept work',
  },
];

export const faqs = [
  { question: 'What services does UMJ Digital provide?', answer: 'We provide web development, app development, UI/UX design, brand identity and graphic design, video editing and content production, and digital marketing strategy for business growth.' },
  { question: 'Do you provide quotations before starting a project?', answer: 'Yes. We review project scope, deliverables and timeline before preparing a quote tailored to the exact needs of the brief.' },
  { question: 'How long does a typical project take?', answer: 'Project timelines depend on complexity and the size of the scope. Simpler websites may take a few weeks, while larger systems require a longer roadmap.' },
  { question: 'How many revision rounds are included?', answer: 'We establish a defined revision structure during onboarding so the project remains efficient while preserving room for meaningful feedback.' },
  { question: 'Can you work with international clients?', answer: 'Yes. We support international clients through digital communication, structured planning and collaborative revision workflows.' },
  { question: 'How do we communicate during projects?', answer: 'Communication is handled through agreed channels and milestone reviews to ensure clarity, efficient feedback and accurate progress tracking.' },
  { question: 'What does project delivery include?', answer: 'Delivery typically includes the agreed design or development files, launch assets, implementation guidance and any defined handover support.' },
  { question: 'Do you offer website maintenance after launch?', answer: 'We offer ongoing support for updates, enhancements and long-term digital maintenance based on your agreed maintenance plan.' },
];

export const trustStats = [
  { label: 'Services', value: '06' },
  { label: 'Core Focus', value: 'Brand + Growth' },
  { label: 'Approach', value: 'Strategy-first' },
  { label: 'Delivery', value: 'Global' },
];

export const homeHighlights = [
  { title: 'Web & App', text: 'Sales-driven digital experiences built for conversion and usability.', icon: Cpu },
  { title: 'Brand Systems', text: 'Memorable identity direction that gives your business a stronger visual edge.', icon: Sparkles },
  { title: 'Content & Growth', text: 'Campaign assets and digital storytelling built to engage, convert and retain.', icon: Wrench },
  { title: 'Creative Direction', text: 'A blended strategic and artistic process shaped by clarity and performance.', icon: Compass },
];

export const serviceHighlights = [
  { title: 'Design with purpose', text: 'Every touchpoint is built to align with business goals and user intent.', icon: Layers3 },
  { title: 'Performance ready', text: 'Fast, polished experiences that feel premium and work beautifully across screens.', icon: ArrowUpRight },
  { title: 'Built for growth', text: 'Strategy, communication and creative systems designed to support ongoing momentum.', icon: Briefcase },
];
