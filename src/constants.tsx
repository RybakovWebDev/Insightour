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

export const logoImage = logo;

export const ICONS = {
  Whatsapp: { src: "/images/contacts/whatsapp.svg", alt: "Contact on Whatsapp" },
  WhatsappColor: { src: "/images/contacts/whatsapp-color.svg", alt: "Contact on Whatsapp" },
  TikTok: { src: "/images/contacts/tiktok.svg", alt: "Contact on TikTok" },
  Phone: { src: "/images/contacts/phone-call.svg", alt: "Call phone number 1" },
  Bitcoin: { src: "/images/contacts/btc.svg", alt: "Bitcoin logo" },
};

export const NAVLINKS = [
  {
    title: "About Us",
    slug: "about",
    href: "/",
  },
  {
    title: "Tours",
    slug: "offers",
    href: "/",
  },
  {
    title: "Contacts",
    slug: "contact",
    href: "/",
  },
];

export const TOUR_DURATIONS = [
  { slug: "3days", title: "3 Days" },
  { slug: "7days", title: "7 Days" },
  { slug: "10days", title: "10 Days" },
];

export const OFFER_PACKAGES = [
  {
    slug: "economy",
    title: "Economy",
    lengthDays: [1, 3, 7],
    benefits: ["4* hotel", "Premium transportation", "2 activities per day"],
    price: "300",
  },
  {
    slug: "luxe",
    title: "Luxe",
    lengthDays: [1, 3, 7],
    benefits: ["5* hotel", "Premium transportion", "3 activities per day", "Memorable photoshoot"],
    price: "600",
  },
  {
    slug: "vip",
    title: "VIP",
    lengthDays: [1, 3, 7],
    benefits: [
      "5* hotel",
      "VIP transportion",
      "3-4 activities per day",
      "Real estate advisory",
      "Memorable photoshooot",
      "Individually tailored tour",
    ],
    price: "1000",
  },
];

export const threeDayTourBreakdown = [
  {
    title: "Day 1",
    description: "Discover the magic of Tbilisi",
    activities: [
      "Visit the unique Immersive tour with actors in the city center",
      "Enjoy nature in the Botanical Garden Park",
      "Experience Sulfur bath",
    ],
  },
  {
    title: "Day 2",
    description: "Hidden Gems in Georgia's Heart",
    activities: [
      "Visit Mtskheta, ancient capital of Georgia",
      "See the confluence of the rivers Mtkvari and Argevi from the mountain Jvari",
      "Go to the city of Kutaisi, the second largest city in Georgia",
      "Visit Sataplia Caves, second-largest caves of Europe and enjoy riding rubber boats in the narrow valley",
      "Go to Batumi",
    ],
  },
  {
    title: "Day 3",
    description: "Coastal Charm: Nature's Best Secrets",
    activities: [
      "Visit the most beautiful and the largest natural reservoir, which lies on the shores of the Black Sea",
      "Watch the waterfall and bridge Queen Tamara in Makhuntseti",
      "Go back to Tbilisi",
    ],
  },
];

export const sevenDayTourBreakdown = [
  {
    title: "Day 1",
    description: "Discover the magic of Tbilisi",
    activities: [
      "Visit the unique Immersive tour with actors in the city center",
      "Enjoy nature in the Botanical Garden Park",
      "Experience Sulfur bath",
    ],
  },
  {
    title: "Day 2",
    description: "Mountain Majesty & Ancient Castle",
    activities: [
      "Visit the historical Ananuri castle, located on Argevi River",
      "See breathtaking view from peaks of the Caucasus Mountains at an altitude of 5500 meters above sea level",
      "Dinner at a beautiful tavern with products from local farms",
      "Get back to Tbilisi",
    ],
  },
  {
    title: "Day 3",
    description: "Explore Kutaisi's Marvels: Waterfalls and Valleys",
    activities: [
      "Go to the city of Kutaisi, the second largest city in Georgia",
      "Go to the Okatse valley, which has lots of waterfalls and wonderful nature",
      "Ride the rubber boats in the narrow valley of Martvili paradise",
      "Get to Batumi",
    ],
  },
  {
    title: "Day 4",
    description: "Batumi: Where Lush Gardens Meet Cultural Splendor",
    activities: [
      "Visit the Botanical Garden, which was established 103 years ago and includes many rare trees from all over the world",
      "Have a walking tour around the city",
      "Go to the sea side",
      "Have a memorable Photoshoot",
    ],
  },
  {
    title: "Day 5",
    description: "Experience Batumi's Majestic Attractions",
    activities: [
      "Visit the Makhuntseti Waterfall and Makhuntseti Bridge named after Queen Tamara",
      "See the Dolphin show",
      "Take a tour around Lake Batumi and ride the cable car",
      "Observe the cityscape from a stunning vantage point",
    ],
  },
  {
    title: "Day 6",
    description: "Borjomi's Natural Wonders",
    activities: [
      "Visit Borjomi, famous for its sulphuric waters and lush towering mountains",
      "Go to Batumi",
      "Wander through the national park, one of Europe's largest parks",
      "Take a cable car ride to the mountain peak to admire the panoramic view of the city from above",
    ],
  },
  {
    title: "Day 7",
    description: "From Mtskheta to Tbilisi: River Views & Retail Therapy",
    activities: [
      "Visit Mtskheta, ancient capital of Georgia",
      "See the confluence of the rivers Mtkvari and Argevi from the mountain Jvari",
      "Come back to Tbilisi",
      "Go to the main malls for shopping",
    ],
  },
];

export const tenDayTourBreakdown = [
  {
    title: "Day 1",
    description: "Immersive City Tour",
    activities: [
      "Visit the unique Immersive tour with actors in the city center",
      "Enjoy nature in the Botanical Garden Park",
      "Wander around the city with a tour guide",
    ],
  },
  {
    title: "Day 2",
    description: "Ananuri Castle & Mountain Adventure",
    activities: [
      "Visit the historical Ananuri castle, located on Argevi River",
      "See breathtaking view from peaks of the Caucasus Mountains at an altitude of 5500 meters above sea level",
      "Dinner at a beautiful tavern with products from local farms",
      "Get back to Tbilisi",
    ],
  },
  {
    title: "Day 3",
    description: "Experience Georgian Natural Wonders",
    activities: [
      "Visit Borjomi, famous for its sulfuric waters and green towering mountains",
      "Explore one of Europe's largest national parks and take a cable car ride to the top of the mountain to enjoy panoramic views",
      "Relax in the sulfur swimming pool",
      "Continue our journey to Kutaisi and visit the caves of Sataplia and Prometheus, the second-largest caves in Europe",
      "Visit the bottom of the cave where there is a lake and take boat rides",
    ],
  },
  {
    title: "Day 4",
    description: "Discover Georgian Waterfall Wonders",
    activities: [
      "Visit the Okatse Valley, which is about 16 km long and boasts numerous waterfalls surrounded by lush green nature, offering picturesque scenery",
      "Proceed to Martvili Canyon to experience a boat ride in the narrow valley",
    ],
  },
  {
    title: "Day 5",
    description: "Batumi: Where Lush Gardens Meet Cultural Splendor",
    activities: [
      "Visit the Botanical Garden, which was established 103 years ago and includes many rare trees from all over the world",
      "Have a walking tour around the city",
      "Go to the sea side",
    ],
  },
  {
    title: "Day 6",
    description: "Capture Unforgettable Memories",
    activities: [
      "Wander through the national park, one of Europe's largest parks",
      "Take a cable car ride to the mountain peak to admire the panoramic view of the city from above",
      "Have a memorable Photoshoot",
    ],
  },
  {
    title: "Day 7",
    description: "Experience Batumi's Majestic Attractions",
    activities: [
      "Travel 28 kilometers west to the town of Makhuntseti to visit the Makhuntseti waterfall and the Makhuntseti Bridge, known for its connection to Queen Tamara. Witness the stunning beauty of nature that is unparalleled in the world",
      "See a dolphin show and enjoy a free tour around Lake Batumi",
      "Take a cable car ride to admire the picturesque peaks and behold the impressive city scenery from above",
    ],
  },
  {
    title: "Day 8",
    description: "Uncover the city of LOVE",
    activities: [
      "Visit Sighnaghi, famous city",
      "Сollect Georgia's cultural code by participating in a quest with professional actors",
      "Visit local wineries to see breathtaking views from the mountain",
      "Come back to Tbilisi",
      "Explore the Chardin area with its many restaurants and cafes in European and Arab styles",
    ],
  },
  {
    title: "Day 9",
    description: "Mtskheta's Historical Treasures",
    activities: [
      "Visit Mtskheta, ancient capital of Georgia",
      "See the confluence of the rivers Mtkvari and Argevi from the mountain Jvari",
      "Have lunch at a beautiful tavern with products from local farms",
      "Get back to Tbilisi",
    ],
  },
  {
    title: "Day 10",
    description: "Explore Tbilisi's Hidden Gems!",
    activities: [
      "Visit the European Park (Rike Park) to see the dancing fountain and the famous Bridge of Peace",
      "Go to the biggest mall in Georgia for shopping",
    ],
  },
];

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
    link: "https://t.me/poka_katt",
    iconProps: ICONS.Whatsapp,
    description: "Contact us on Whatsapp",
  },
  {
    title: "TikTok",
    link: "https://www.instagram.com/insightour.ge",
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
];

export const PHOTOS_HOR = [
  { src: photoAbout18, alt: "Georgian landscape" },
  { src: photoAbout6, alt: "Georgian landscape" },
  { src: photoAbout9, alt: "Georgian landscape" },
  { src: photoAbout22, alt: "Georgian landscape" },
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
