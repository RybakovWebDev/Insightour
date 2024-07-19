import logo from "../public/images/logo_image.webp";
import photoAbout5 from "../public/images/photos/photo5.webp";
import photoAbout6 from "../public/images/photos/photo6.webp";
import photoAbout7 from "../public/images/photos/photo7.webp";
import photoAbout8 from "../public/images/photos/photo8.webp";
import photoAbout9 from "../public/images/photos/photo9.webp";
import photoAbout10 from "../public/images/photos/photo10.webp";
import photoAbout11 from "../public/images/photos/photo11.webp";
import photoAbout12 from "../public/images/photos/photo12.webp";
import photoAbout13 from "../public/images/photos/photo13.webp";
import photoAbout14 from "../public/images/photos/photo14.webp";
import photoAbout15 from "../public/images/photos/photo15.webp";
import photoAbout16 from "../public/images/photos/photo16.webp";
import photoAbout17 from "../public/images/photos/photo17.webp";
import photoAbout18 from "../public/images/photos/photo18.webp";
import photoAbout19 from "../public/images/photos/photo19.webp";
import photoAbout20 from "../public/images/photos/photo20.webp";
import photoAbout21 from "../public/images/photos/photo21.webp";
import photoAbout22 from "../public/images/photos/photo22.webp";
import photoAbout23 from "../public/images/photos/photo23.webp";
import photoAbout24 from "../public/images/photos/photo24.webp";
import photoAbout25 from "../public/images/photos/photo25.webp";
import photoAbout26 from "../public/images/photos/photo26.webp";
import photoAbout27 from "../public/images/photos/photo27.webp";
import photoAbout28 from "../public/images/photos/photo28.webp";
import photoAbout29 from "../public/images/photos/photo29.webp";
import photoAbout30 from "../public/images/photos/photo30.webp";

export const logoImage = logo;

export const LANGUAGES = {
  en: "English",
  ar: "العربية",
} as const;

export type LanguageCode = keyof typeof LANGUAGES;

export const ICONS = {
  Whatsapp: { src: "/images/contacts/whatsapp.svg", alt: "Contact on Whatsapp" },
  WhatsappColor: { src: "/images/contacts/whatsapp-color.svg", alt: "Contact on Whatsapp" },
  TikTok: { src: "/images/contacts/tiktok.svg", alt: "Contact on TikTok" },
  Phone: { src: "/images/contacts/phone-call.svg", alt: "Call phone number 1" },
  Bitcoin: { src: "/images/contacts/btc.svg", alt: "Bitcoin logo" },
};

interface ContactsInterface {
  title: string;
  link: string;
  iconProps: { src: string; alt: string };
  description: string;
  number?: string;
}

export const SOCIALS: ContactsInterface[] = [
  {
    title: "Whatsapp",
    link: "https://wa.me/995591022961",
    iconProps: ICONS.Whatsapp,
    description: "Contact us on Whatsapp",
  },
  {
    title: "TikTok",
    link: "https://www.tiktok.com/@insightour.ge?_t=8o7Xv1NSq8N&_r=1",
    iconProps: ICONS.TikTok,
    description: "Follow us on TikTok",
  },
];

export const PHONES: ContactsInterface[] = [
  {
    title: "Phone1",
    number: "+995591022961",
    link: "tel:+995591022961",
    iconProps: ICONS.Phone,
    description: "Contact us by phone",
  },
];

export const PHOTOS_ALL = [
  { src: photoAbout5, alt: "Georgian landscape", isPortrait: true },
  { src: photoAbout6, alt: "Georgian landscape", isPortrait: false },
  { src: photoAbout7, alt: "Georgian landscape", isPortrait: true },
  { src: photoAbout8, alt: "Georgian landscape", isPortrait: false },
  { src: photoAbout9, alt: "Georgian landscape", isPortrait: false },
  { src: photoAbout10, alt: "Georgian landscape", isPortrait: true },
  { src: photoAbout11, alt: "Georgian landscape", isPortrait: false },
  { src: photoAbout12, alt: "Georgian landscape", isPortrait: true },
  { src: photoAbout13, alt: "Georgian landscape", isPortrait: true },
  { src: photoAbout14, alt: "Georgian landscape", isPortrait: true },
  { src: photoAbout15, alt: "Georgian landscape", isPortrait: false },
  { src: photoAbout16, alt: "Georgian landscape", isPortrait: false },
  { src: photoAbout17, alt: "Georgian landscape", isPortrait: true },
  { src: photoAbout18, alt: "Georgian landscape", isPortrait: false },
  { src: photoAbout19, alt: "Georgian landscape", isPortrait: true },
  { src: photoAbout20, alt: "Georgian landscape", isPortrait: false },
  { src: photoAbout21, alt: "Georgian landscape", isPortrait: true },
];

export const PHOTOS_VERT = [
  { src: photoAbout19, alt: "Georgian landscape" },
  { src: photoAbout12, alt: "Georgian landscape" },
  { src: photoAbout17, alt: "Georgian landscape" },
  { src: photoAbout14, alt: "Georgian landscape" },
  { src: photoAbout23, alt: "Georgian landscape" },
  { src: photoAbout24, alt: "Georgian landscape" },
  { src: photoAbout25, alt: "Georgian landscape" },
  { src: photoAbout26, alt: "Georgian landscape" },
];

export const PHOTOS_HOR = [
  { src: photoAbout18, alt: "Georgian landscape" },
  { src: photoAbout6, alt: "Georgian landscape" },
  { src: photoAbout28, alt: "Georgian landscape" },
  { src: photoAbout9, alt: "Georgian landscape" },
  { src: photoAbout22, alt: "Georgian landscape" },
  { src: photoAbout27, alt: "Georgian landscape" },
  { src: photoAbout29, alt: "Georgian landscape" },
  { src: photoAbout30, alt: "Georgian landscape" },
];

export const PHOTOS_ABOUT = [
  { src: photoAbout10, alt: "Georgian landscape" },
  { src: photoAbout18, alt: "Georgian landscape" },
];

export const smoothSpring = {
  type: "spring",
  damping: 60,
  stiffness: 500,
};

export const shevronAnimation = {
  delay: 1,
  duration: 1,
  ease: "easeInOut",
  repeat: Infinity,
  repeatDelay: 1,
};
