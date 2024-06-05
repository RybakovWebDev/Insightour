import logo from "../public/images/logo.png";

export const logoImage = logo;

export const NAVLINKS = [
  {
    title: "About Us",
    slug: "about",
    href: "/",
  },
  {
    title: "Tours",
    slug: "projects",
    href: "/",
  },
  {
    title: "Contacts",
    slug: "contact",
    href: "/",
  },
];

export const SOCIALS = [
  {
    title: "Telegram",
    link: "https://t.me/poka_katt",
    iconProps: { src: "/images/contacts/telegram-logo-thin.svg", alt: "Contact on Telegram" },
    description: "Contact us on Telegram",
  },
  {
    title: "Instagram",
    link: "https://www.instagram.com/insightour.ge",
    iconProps: { src: "/images/contacts/instagram.svg", alt: "Contact on Instagram" },
    description: "Follow us on Instagram",
  },
];

export const CONTACTS = [
  {
    title: "Phone1",
    number: "+995598225431",
    link: "tel:+995598225431",
    iconProps: { src: "/images/contacts/phone-call.svg", alt: "Call phone number 1" },
    description: "Contact us by phone",
  },
  {
    title: "Phone2",
    number: "+995591022961",
    link: "tel:+995591022961",
    iconProps: { src: "/images/contacts/phone-call.svg", alt: "Call phone number 2" },
    description: "Contact us by phone",
  },
];

export const smoothSpring = {
  type: "spring",
  damping: 60,
  stiffness: 500,
};
