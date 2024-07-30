import dentalIcon from "../public/images/icons/tooth.webp";
import cosmeticIcon from "../public/images/icons/general_surgery.webp";
import reproductiveIcon from "../public/images/icons/baby_0203m.webp";
import wellnessIcon from "../public/images/icons/forest.webp";
import { ICONS } from "./constants";

export const TOUR_DURATIONS = [
  { slug: "3days", title: { en: "3 Days", ar: "٣ أيام" } },
  { slug: "7days", title: { en: "7 Days", ar: "٧ أيام" } },
  { slug: "10days", title: { en: "10 Days", ar: "١٠ أيام" } },
];

export const NAVLINKS = [
  {
    slug: "about",
    href: "/",
    titles: {
      en: "About Us",
      ar: "عنا",
    },
  },
  {
    slug: "rates",
    href: "/",
    titles: {
      en: "Rates",
      ar: "الأسعار",
    },
  },
  {
    slug: "offers",
    href: "/",
    titles: {
      en: "Tours",
      ar: "الجولات",
    },
  },
  {
    slug: "services",
    href: "/",
    titles: {
      en: "Services",
      //TODO
      ar: "الجولات",
      //TODO
    },
  },
  {
    slug: "contact",
    href: "/",
    titles: {
      en: "Contacts",
      ar: "اتصل بنا",
    },
  },
];

export const Hero_Text = {
  line1: {
    en: "Immersive tours",
    ar: "جولات غامرة",
  },
  line2: {
    en: "experiences of Georgia",
    ar: "تجارب جورجيا",
  },
};

export const CallToActionButton_Text = {
  button: {
    en: "Book Tour",
    ar: "احجز جولة",
  },
  buttonAppointment: {
    en: "Book an appointment",
    ar: "",
  },
  name: {
    en: "Name",
    ar: "اسم",
  },
  namePlaceholder: {
    en: "Name",
    ar: "اسم",
  },
  Whatsapp: {
    en: "Whatsapp number",
    ar: "رقم واتس اب",
  },
  WhatsappPlaceholder: {
    en: "Phone number",
    ar: "رقم التليفون",
  },
  comment: {
    en: "Comment",
    ar: "تعليق",
  },
  commentPlaceholder: {
    en: "Comment text",
    ar: "نص التعليق",
  },
  success: {
    en: "Message sent! We will contact you soon 😊",
    ar: "تم إرسال الرسالة! سوف نتصل بك قريبًا 😊",
  },
  send: {
    en: "Send",
    ar: "أرسل",
  },
};

export const About_Text = {
  sectionName: {
    en: "about us",
    ar: "حولنا",
  },
  intro1: {
    en: "WE OFFER A BRAND NEW FORMAT OF EXPLORING GEORGIA",
    ar: "نحن نقدم صيغة جديدة كلياً لاستكشاف جورجيا",
  },
  intro2: {
    en: "THROUGH STORIES, URBAN",
    ar: "عبر القصص",
  },
  intro3: {
    en: "LEGENDS AND",
    ar: "والأساطير الحضرية",
  },
  intro4: {
    en: "THEIR",
    ar: "وأبطالها",
  },
  intro5: {
    en: "HEROES",
    ar: "الأبطال",
  },
  textBlock1: {
    en: "Safety and comfort",
    ar: "الأمان",
  },
  textBlock2: {
    en: "Nature and architecture",
    ar: "الطبيعة والهندسة المعمارية",
  },
  textBlock3: {
    en: "Bright gastronomic",
    ar: "تجربة تذوقية مميزة",
  },
  textBlock3_5: {
    en: "experience",
    ar: "",
  },
  textBlock4: {
    en: "Local color and traditions",
    ar: "اللون المحلي والتقاليد",
  },
  discover1: {
    en: "DISCOVER",
    ar: "اكتشف",
  },
  discover2: {
    en: "GEORGIA",
    ar: "جورجيا",
  },
  discover3: {
    en: "THROUGH",
    ar: "من خلال",
  },
  discover4: {
    en: "EMOTIONS",
    ar: "العواطف",
  },
};

export const Explore_Text = {
  exploreRevealButton: {
    en: "Explore Georgia",
    ar: "استكشف جورجيا",
  },

  exploreSections: [
    {
      name: { en: "History", ar: "التاريخ" },
      text: {
        en: "Georgia’s history spans thousands of years, shaped by significant events such as its founding by ancient tribes and the establishment of the Kingdom of Colchis, which is associated with the legend of Jason and the Argonauts. Positioned at key trade routes, it has cultivated trade and cultural exchange, particularly during the Silk Road era. The country is known for its ancient winemaking traditions, with archaeological evidence suggesting winemaking as far back as 6000 BC, alongside unique handcrafted products, boosting its agricultural sector and gastronomic tourism. Recently, the growth of contemporary art and creative industries has made it attractive for young entrepreneurs and startups. Its contributions to global culture in literature, music, and the arts continue to inspire people worldwide.",
        ar: "يعود تاريخ جورجيا إلى آلاف السنين، وقد تشكلت على يد أحداث هامة مثل تأسيسها بواسطة القبائل القديمة وإقامة مملكة كولخيس، المرتبطة بأسطورة جايسون والأرجونوت. وبفضل موقعها الاستراتيجي على طرق التجارة الرئيسية، قامت بتطوير التجارة وتبادل الثقافات، خاصة خلال فترة طريق الحرير. تشتهر البلاد بتقاليدها القديمة في صناعة النبيذ، مع وجود أدلة أثرية تشير إلى صناعة النبيذ منذ حوالي 6000 قبل الميلاد، إلى جانب المنتجات اليدوية الفريدة التي تعزز قطاعها الزراعي والسياحة الغذائية. مؤخراً، جعل نمو الفن المعاصر والصناعات الإبداعية البلاد جذابة لرواد الأعمال الشباب والشركات الناشئة. تواصل مساهماتها في الثقافة العالمية في الأدب والموسيقى والفنون إلهام الناس في جميع أنحاء العالم.",
      },
    },
    {
      name: { en: "Climate", ar: "المناخ" },
      text: {
        en: "Georgia is renowned for its diverse climate thanks to its unique geographical position. Here, one can encounter a mild subtropical climate along the Black Sea coast as well as a continental climate in the mountainous regions. Summers are warm and sunny, while winters can be cold in the highlands. Such a climate attracts not only tourists but also investors interested in the agricultural sector and ecotourism.",
        ar: "تشتهر جورجيا بمناخها المتنوع بفضل موقعها الجغرافي الفريد. يمكن للمرء أن يواجه مناخاً شبه استوائي معتدل على ساحل البحر الأسود، فضلاً عن مناخ قاري في المناطق الجبلية. الصيف دافئ ومشمس، بينما قد تكون الشتاء باردة في المرتفعات. يجذب هذا المناخ ليس فقط السياح ولكن أيضاً المستثمرين المهتمين بالقطاع الزراعي والسياحة البيئية.",
      },
    },
    {
      name: { en: "Developing Economy", ar: "الاقتصاد المتطور" },
      text: {
        en: "Georgia demonstrates stable economic growth, making the country appealing for investments. Global rankings show that Georgia holds high positions for ease of doing business among CIS countries. The main sectors of the economy include agriculture, tourism, and IT technologies. In recent years, the government has initiated a series of reforms aimed at improving the business climate, attracting both local and foreign investors. Georgia is actively developing transportation infrastructure, linking Europe and Asia. This creates convenient conditions for logistics and trade, positively impacting the country's economy.",
        ar: "تُظهر جورجيا نمواً اقتصادياً مستقراً، مما يجعل البلاد جذابة للاستثمارات. وتظهر التصنيفات العالمية أن جورجيا تحتل مراكز عالية من حيث سهولة ممارسة الأعمال التجارية بين دول رابطة الدول المستقلة. تشمل القطاعات الرئيسية في الاقتصاد الزراعة والسياحة وتقنيات المعلومات. في السنوات الأخيرة، أطلقت الحكومة سلسلة من الإصلاحات تهدف إلى تحسين مناخ الأعمال، وجذب كل من المستثمرين المحليين والأجانب. تقوم جورجيا بتطوير بنية النقل التحتية بنشاط، مما يربط بين أوروبا وآسيا، مما يخلق ظروفاً ملائمة للوجستيات والتجارة، ويؤثر إيجابياً على اقتصاد البلاد.",
      },
    },
    {
      name: { en: "Real Estate", ar: "العقارات" },
      text: {
        en: "Real estate in Georgia is becoming increasingly attractive to foreign investors. With moderate prices and ease of doing business, the country offers a wide selection of both primary and secondary housing. Coastal areas, such as Batumi, attract significant interest due to rapid infrastructure development. The government of Georgia actively supports programs for foreign citizens, simplifying the process of purchasing real estate. There are also favorable conditions for renting out properties. Investments in real estate here can provide stable income, and the location is becoming more popular among tourists.",
        ar: "أصبحت العقارات في جورجيا جذابة بشكل متزايد للمستثمرين الأجانب. مع الأسعار المعتدلة وسهولة ممارسة الأعمال التجارية، تقدم البلاد مجموعة واسعة من المساكن الأولية والثانوية. المناطق الساحلية، مثل باتومي، تجذب اهتماماً كبيراً بسبب التطور السريع في البنية التحتية. تدعم حكومة جورجيا بنشاط البرامج للمواطنين الأجانب، مما يسهل عملية شراء العقارات. كما توجد شروط ملائمة لتأجير العقارات. يمكن أن توفر الاستثمارات في العقارات هنا دخلاً ثابتاً، والموقع يصبح أكثر شعبية بين السياح.",
      },
    },
  ],
};

export const Offers_Text = {
  sectionName: {
    en: "our rates",
    ar: "أسعارنا",
  },
  servicesIncluded: {
    en: "Services included:",
    ar: ":خدمات الجولة",
  },
  servicesNotIncluded: {
    en: "Services not included:",
    ar: ":البرنامج لا يشمل التالي",
  },
  includedArray: [
    {
      en: "Pick-up and drop-off to and from the airport",
      ar: "التوصيل من وإلى المطار",
    },
    {
      en: "Hotel reservations",
      ar: "حجوزات الفنادق",
    },
    {
      en: "Buffet breakfast",
      ar: "بوفيه الإفطار",
    },
    {
      en: "All transfers by private car for a tour to enjoy privacy with family or friends",
      ar: "جميع التنقلات بسيارة خاصة للجولة للاستمتاع بالخصوصية مع العائلة أو الأصدقاء",
    },
    {
      en: "Tour guide fluent in Arabic and English",
      ar: "دليل سياحي يتحدث العربية والإنجليزية بطلاقة",
    },
  ],
  notIncludedArray: [
    {
      en: "Airline tickets",
      ar: "تذاكر الطيران",
    },
    {
      en: "Lunch and dinner",
      ar: "الغداء والعشاء",
    },
    {
      en: "Entry tickets to tourist places",
      ar: "تذاكر الدخول إلى الأماكن السياحية",
    },
  ],
  startingAt: {
    en: "From",
    ar: "من",
  },
};

export const OFFER_PACKAGES = [
  {
    slug: "economy",
    title: {
      en: "Economy",
      ar: "اقتصادي",
    },
    lengthDays: [1, 3, 7],
    benefits: [
      {
        en: "4* hotel",
        ar: "فندق 4 نجوم",
      },
      {
        en: "Premium transportation",
        ar: "نقل بريميوم",
      },
      {
        en: "2 activities per day",
        ar: "نشاطان يومياً",
      },
    ],
    price: "300",
  },
  {
    slug: "lux",
    title: {
      en: "Lux",
      ar: "فخم",
    },
    lengthDays: [1, 3, 7],
    benefits: [
      {
        en: "5* hotel",
        ar: "فندق 5 نجوم",
      },
      {
        en: "Premium transportation",
        ar: "نقل بريميوم",
      },
      {
        en: "3 activities per day",
        ar: "3 أنشطة يومياً",
      },
      {
        en: "Memorable photoshoot",
        ar: "جلسة تصوير لا تُنسى",
      },
    ],
    price: "600",
  },
  {
    slug: "vip",
    title: {
      en: "VIP",
      ar: "كبار الشخصيات",
    },
    lengthDays: [1, 3, 7],
    benefits: [
      {
        en: "5* hotel",
        ar: "فندق 5 نجوم",
      },
      {
        en: "VIP transportation",
        ar: "نقل كبار الشخصيات",
      },
      {
        en: "3-4 activities per day",
        ar: "3-4 أنشطة يومياً",
      },
      {
        en: "Real estate advisory",
        ar: "استشارات عقارية",
      },
      {
        en: "Memorable photoshoot",
        ar: "جلسة تصوير لا تُنسى",
      },
      {
        en: "Individually tailored tour",
        ar: "جولة مخصصة بشكل فردي",
      },
    ],
    price: "1000",
  },
];

export const DaysBreakdown_Text = {
  sectionName: {
    en: "our tours",
    ar: "جولاتنا",
  },
};

export const threeDayTourBreakdown = [
  {
    title: {
      en: "Day 1",
      ar: "اليوم الأول",
    },
    description: {
      en: "Discover the magic of Tbilisi",
      ar: "اكتشاف سحر تبليسي",
    },
    activities: [
      {
        en: "Visit the unique Immersive tour with actors in the city center",
        ar: "قم بزيارة الجولة الفريدة الغامرة مع الممثلين في وسط المدينة",
      },
      {
        en: "Enjoy nature in the Botanical Garden Park",
        ar: "استمتع بالطبيعة في حديقة النباتات",
      },
      {
        en: "Experience Sulfur bath",
        ar: "استمتع بحمام الكبريت",
      },
    ],
  },
  {
    title: {
      en: "Day 2",
      ar: "اليوم الثاني",
    },
    description: {
      en: "Hidden Gems in Georgia's Heart",
      ar: "الجواهر المخفية في قلب جورجيا",
    },
    activities: [
      {
        en: "Visit Mtskheta, ancient capital of Georgia",
        ar: "قم بزيارة متسخيتا، العاصمة القديمة لجورجيا",
      },
      {
        en: "See the confluence of the rivers Mtkvari and Argevi from the mountain Jvari",
        ar: "شاهد التقاء نهري متكفاري وأرغفي من جبل جفاري",
      },
      {
        en: "Go to the city of Kutaisi, the second largest city in Georgia",
        ar: "اذهب إلى مدينة كوتايسي، ثاني أكبر مدينة في جورجيا",
      },
      {
        en: "Visit Sataplia Caves, second-largest caves of Europe and enjoy riding rubber boats in the narrow valley",
        ar: "قم بزيارة كهوف ساتابليا، ثاني أكبر كهوف في أوروبا واستمتع بركوب القوارب المطاطية في الوادي الضيق",
      },
      {
        en: "Go to Batumi",
        ar: "اذهب إلى باتومي",
      },
    ],
  },
  {
    title: {
      en: "Day 3",
      ar: "اليوم الثالث",
    },
    description: {
      en: "Coastal Charm: Nature's Best Secrets",
      ar: "سحر الساحل: أفضل أسرار الطبيعة",
    },
    activities: [
      {
        en: "Visit the most beautiful and the largest natural reservoir, which lies on the shores of the Black Sea",
        ar: "قم بزيارة أجمل وأكبر خزان طبيعي يقع على شواطئ البحر الأسود",
      },
      {
        en: "Watch the waterfall and bridge Queen Tamara in Makhuntseti",
        ar: "شاهد الشلال والجسر الملكة تامارا في ماخونتسيتي",
      },
      {
        en: "Go back to Tbilisi",
        ar: "عد إلى تبليسي",
      },
    ],
  },
];

export const sevenDayTourBreakdown = [
  {
    title: {
      en: "Day 1",
      ar: "اليوم الأول",
    },
    description: {
      en: "Discover the magic of Tbilisi",
      ar: "اكتشاف سحر تبليسي",
    },
    activities: [
      {
        en: "Visit the unique Immersive tour with actors in the city center",
        ar: "قم بزيارة الجولة الفريدة الغامرة مع الممثلين في وسط المدينة",
      },
      {
        en: "Enjoy nature in the Botanical Garden Park",
        ar: "استمتع بالطبيعة في حديقة النباتات",
      },
      {
        en: "Experience Sulfur bath",
        ar: "استمتع بحمام الكبريت",
      },
    ],
  },
  {
    title: {
      en: "Day 2",
      ar: "اليوم الثاني",
    },
    description: {
      en: "Mountain Majesty & Ancient Castle",
      ar: "عظمة الجبال والقلاع القديمة",
    },
    activities: [
      {
        en: "Visit the historical Ananuri castle, located on Argevi River",
        ar: "قم بزيارة قلعة أنانوري التاريخية الواقعة على نهر أرغفي",
      },
      {
        en: "See breathtaking view from peaks of the Caucasus Mountains at an altitude of 5500 meters above sea level",
        ar: "شاهد مناظر خلابة من قمم جبال القوقاز على ارتفاع 5500 متر فوق مستوى سطح البحر",
      },
      {
        en: "Dinner at a beautiful tavern with products from local farms",
        ar: "تناول العشاء في حانة جميلة مع منتجات من المزارع المحلية",
      },
      {
        en: "Get back to Tbilisi",
        ar: "العودة إلى تبليسي",
      },
    ],
  },
  {
    title: {
      en: "Day 3",
      ar: "اليوم الثالث",
    },
    description: {
      en: "Explore Kutaisi's Marvels: Waterfalls and Valleys",
      ar: "استكشاف عجائب كوتايسي: الشلالات والوديان",
    },
    activities: [
      {
        en: "Go to the city of Kutaisi, the second largest city in Georgia",
        ar: "اذهب إلى مدينة كوتايسي، ثاني أكبر مدينة في جورجيا",
      },
      {
        en: "Go to the Okatse valley, which has lots of waterfalls and wonderful nature",
        ar: "اذهب إلى وادي أوكاتسي، الذي يحتوي على العديد من الشلالات والطبيعة الرائعة",
      },
      {
        en: "Ride the rubber boats in the narrow valley of Martvili paradise",
        ar: "اركب القوارب المطاطية في الوادي الضيق في جنة مارتفيلي",
      },
      {
        en: "Get to Batumi",
        ar: "الوصول إلى باتومي",
      },
    ],
  },
  {
    title: {
      en: "Day 4",
      ar: "اليوم الرابع",
    },
    description: {
      en: "Batumi: Where Lush Gardens Meet Cultural Splendor",
      ar: "باتومي: حيث الحدائق الخضراء تلتقي بالفخامة الثقافية",
    },
    activities: [
      {
        en: "Visit the Botanical Garden, which was established 103 years ago and includes many rare trees from all over the world",
        ar: "قم بزيارة الحديقة النباتية، التي أنشئت قبل 103 سنوات وتضم العديد من الأشجار النادرة من جميع أنحاء العالم",
      },
      {
        en: "Have a walking tour around the city",
        ar: "قم بجولة سيرا على الأقدام حول المدينة",
      },
      {
        en: "Go to the sea side",
        ar: "اذهب إلى شاطئ البحر",
      },
      {
        en: "Have a memorable Photoshoot",
        ar: "قم بجلسة تصوير لا تُنسى",
      },
    ],
  },
  {
    title: {
      en: "Day 5",
      ar: "اليوم الخامس",
    },
    description: {
      en: "Experience Batumi's Majestic Attractions",
      ar: "استكشاف معالم باتومي الرائعة",
    },
    activities: [
      {
        en: "Visit the Makhuntseti Waterfall and Makhuntseti Bridge named after Queen Tamara",
        ar: "قم بزيارة شلال ماخونساتي وجسر ماخونسيتي الذي يحمل اسم الملكة تمارا",
      },
      {
        en: "See the Dolphin show",
        ar: "شاهد عرض الدلافين",
      },
      {
        en: "Take a tour around Lake Batumi and ride the cable car",
        ar: "قم بجولة حول بحيرة باتومي وركوب التلفريك",
      },
      {
        en: "Observe the cityscape from a stunning vantage point",
        ar: "تأمل منظر المدينة من نقطة رؤية رائعة",
      },
    ],
  },
  {
    title: {
      en: "Day 6",
      ar: "اليوم السادس",
    },
    description: {
      en: "Borjomi's Natural Wonders",
      ar: "عجائب بورجومي الطبيعية",
    },
    activities: [
      {
        en: "Visit Borjomi, famous for its sulphuric waters and lush towering mountains",
        ar: "قم بزيارة بورجومي، المشهورة بمياهها الكبريتية وجبالها الشاهقة الخصبة",
      },
      {
        en: "Go to Batumi",
        ar: "الذهاب إلى باتومي",
      },
      {
        en: "Wander through the national park, one of Europe's largest parks",
        ar: "تجول في الحديقة الوطنية، إحدى أكبر الحدائق في أوروبا",
      },
      {
        en: "Take a cable car ride to the mountain peak to admire the panoramic view of the city from above",
        ar: "قم بركوب التلفريك إلى قمة الجبل للاستمتاع بالمنظر البانورامي للمدينة من الأعلى",
      },
    ],
  },
  {
    title: {
      en: "Day 7",
      ar: "اليوم السابع",
    },
    description: {
      en: "From Mtskheta to Tbilisi: River Views & Retail Therapy",
      ar: "من متسخيتا إلى تبليسي: مشاهد النهر وعلاج التسوق",
    },
    activities: [
      {
        en: "Visit Mtskheta, ancient capital of Georgia",
        ar: "قم بزيارة متسخيتا، العاصمة القديمة لجورجيا",
      },
      {
        en: "See the confluence of the rivers Mtkvari and Argevi from the mountain Jvari",
        ar: "شاهد التقاء نهري متكفاري وارجفي من جبل جفاري",
      },
      {
        en: "Come back to Tbilisi",
        ar: "العودة إلى تبليسي",
      },
      {
        en: "Go to the main malls for shopping",
        ar: "اذهب إلى المراكز التجارية الرئيسية للتسوق",
      },
    ],
  },
];

export const tenDayTourBreakdown = [
  {
    title: {
      en: "Day 1",
      ar: "اليوم الأول",
    },
    description: {
      en: "Immersive City Tour",
      ar: "جولة مدينة غامرة",
    },
    activities: [
      {
        en: "Visit the unique Immersive tour with actors in the city center",
        ar: "قم بزيارة الجولة الفريدة الغامرة مع الممثلين في وسط المدينة",
      },
      {
        en: "Enjoy nature in the Botanical Garden Park",
        ar: "استمتع بالطبيعة في حديقة النباتات",
      },
      {
        en: "Wander around the city with a tour guide",
        ar: "تجول في المدينة مع مرشد سياحي",
      },
    ],
  },
  {
    title: {
      en: "Day 2",
      ar: "اليوم الثاني",
    },
    description: {
      en: "Ananuri Castle & Mountain Adventure",
      ar: "قلعة أنانوري ومغامرة الجبال",
    },
    activities: [
      {
        en: "Visit the historical Ananuri castle, located on Argevi River",
        ar: "قم بزيارة قلعة أنانوري التاريخية الواقعة على نهر أرغفي",
      },
      {
        en: "See breathtaking view from peaks of the Caucasus Mountains at an altitude of 5500 meters above sea level",
        ar: "شاهد مناظر خلابة من قمم جبال القوقاز على ارتفاع 5500 متر فوق مستوى سطح البحر",
      },
      {
        en: "Dinner at a beautiful tavern with products from local farms",
        ar: "تناول العشاء في حانة جميلة مع منتجات من المزارع المحلية",
      },
      {
        en: "Get back to Tbilisi",
        ar: "العودة إلى تبليسي",
      },
    ],
  },
  {
    title: {
      en: "Day 3",
      ar: "اليوم الثالث",
    },
    description: {
      en: "Experience Georgian Natural Wonders",
      ar: "تجربة عجائب الطبيعة الجورجية",
    },
    activities: [
      {
        en: "Visit Borjomi, famous for its sulfuric waters and green towering mountains",
        ar: "قم بزيارة بورجومي، المشهورة بمياهها الكبريتية وجبالها الشاهقة الخضراء",
      },
      {
        en: "Explore one of Europe's largest national parks and take a cable car ride to the top of the mountain to enjoy panoramic views",
        ar: "استكشف واحدة من أكبر الحدائق الوطنية في أوروبا وركب التلفريك إلى قمة الجبل للاستمتاع بالمناظر البانورامية",
      },
      {
        en: "Relax in the sulfur swimming pool",
        ar: "استرخ في حمام السباحة الكبريتي",
      },
      {
        en: "Continue our journey to Kutaisi and visit the caves of Sataplia and Prometheus, the second-largest caves in Europe",
        ar: "تابع رحلتنا إلى كوتايسي وقم بزيارة كهوف ساتابليا وبروميثيوس، ثاني أكبر الكهوف في أوروبا",
      },
    ],
  },
  {
    title: {
      en: "Day 4",
      ar: "اليوم الرابع",
    },
    description: {
      en: "Discover Georgian Waterfall Wonders",
      ar: "اكتشاف عجائب الشلالات الجورجية",
    },
    activities: [
      {
        en: "Visit the Okatse Valley, which is about 16 km long and boasts numerous waterfalls surrounded by lush green nature, offering picturesque scenery",
        ar: "قم بزيارة وادي أوكاتسي، الذي يبلغ طوله حوالي 16 كم ويمتاز بالعديد من الشلالات المحاطة بالطبيعة الخضراء الخصبة، مما يوفر مناظر خلابة",
      },
      {
        en: "Proceed to Martvili Canyon to experience a boat ride in the narrow valley",
        ar: "تابع إلى وادي مارتفيلي لتجربة ركوب القوارب في الوادي الضيق",
      },
      {
        en: "Get to Batumi",
        ar: "الوصول إلى باتومي",
      },
    ],
  },
  {
    title: {
      en: "Day 5",
      ar: "اليوم الخامس",
    },
    description: {
      en: "Batumi: Where Lush Gardens Meet Cultural Splendor",
      ar: "باتومي: حيث تلتقي الحدائق الخضراء بالفخامة الثقافية",
    },
    activities: [
      {
        en: "Visit the Botanical Garden, which was established 103 years ago and includes many rare trees from all over the world",
        ar: "قم بزيارة الحديقة النباتية، التي أنشئت قبل 103 سنوات وتضم العديد من الأشجار النادرة من جميع أنحاء العالم",
      },
      {
        en: "Have a walking tour around the city",
        ar: "قم بجولة سيرا على الأقدام حول المدينة",
      },
      {
        en: "Go to the sea side",
        ar: "اذهب إلى شاطئ البحر",
      },
    ],
  },
  {
    title: {
      en: "Day 6",
      ar: "اليوم السادس",
    },
    description: {
      en: "Capture Unforgettable Memories",
      ar: "التقط ذكريات لا تُنسى",
    },
    activities: [
      {
        en: "Take a cable car ride to the mountain peak to admire the panoramic view of the city from above",
        ar: "قم بركوب التلفريك إلى قمة الجبل للاستمتاع بالمنظر البانورامي للمدينة من الأعلى",
      },
      {
        en: "Have a memorable Photoshoot",
        ar: "قم بجلسة تصوير لا تُنسى",
      },
      {
        en: "Go to the main malls for shopping",
        ar: "اذهب إلى المراكز التجارية الرئيسية للتسوق",
      },
    ],
  },
  {
    title: {
      en: "Day 7",
      ar: "اليوم السابع",
    },
    description: {
      en: "Experience Batumi's Majestic Attractions",
      ar: "استكشاف معالم باتومي الرائعة",
    },
    activities: [
      {
        en: "Travel 28 kilometers west to the town of Makhuntseti to visit the Makhuntseti waterfall and the Makhuntseti Bridge, known for its connection to Queen Tamara. Witness the stunning beauty of nature that is unparalleled in the world",
        ar: "سافر 28 كيلومترًا غربًا إلى بلدة ماخونتسيتي لزيارة شلال ماخونتسيتي وجسر ماخونتسيتي، المعروف بعلاقته بالملكة تمارا. شاهد الجمال الطبيعي الرائع الذي لا مثيل له في العالم",
      },
      {
        en: "See a dolphin show and enjoy a free tour around Lake Batumi",
        ar: "شاهد عرض الدلافين واستمتع بجولة مجانية حول بحيرة باتومي",
      },
    ],
  },
  {
    title: {
      en: "Day 8",
      ar: "اليوم الثامن",
    },
    description: {
      en: "Uncover the city of LOVE",
      ar: "اكتشاف مدينة الحب",
    },
    activities: [
      {
        en: "Visit Sighnaghi, famous city",
        ar: "قم بزيارة سغناغي، المدينة الشهيرة",
      },
      {
        en: "Сollect Georgia's cultural code by participating in a quest with professional actors",
        ar: "اجمع رموز الثقافة الجورجية من خلال المشاركة في مهمة مع ممثلين محترفين",
      },
      {
        en: "Visit local wineries to see breathtaking views from the mountain",
        ar: "قم بزيارة مصنع النبيذ المحلية لمشاهدة مناظر خلابة من الجبل",
      },
      {
        en: "Come back to Tbilisi",
        ar: "العودة إلى تبليسي",
      },
      {
        en: "Explore the Chardin area with its many restaurants and cafes in European and Arab styles",
        ar: "استكشف منطقة شاردين التي تضم العديد من المطاعم والمقاهي بأساليب أوروبية وعربية",
      },
    ],
  },
  {
    title: {
      en: "Day 9",
      ar: "اليوم التاسع",
    },
    description: {
      en: "Mtskheta's Historical Treasures",
      ar: "كنوز متسخيتا التاريخية",
    },
    activities: [
      {
        en: "Visit Mtskheta, ancient capital of Georgia",
        ar: "قم بزيارة متسخيتا، العاصمة القديمة لجورجيا",
      },
      {
        en: "See the confluence of the rivers Mtkvari and Argevi from the mountain Jvari",
        ar: "شاهد التقاء نهري متكفاري وارجفي من جبل جفاري",
      },
      {
        en: "Have lunch at a beautiful tavern with products from local farms",
        ar: "تناول الغداء في حانة جميلة مع منتجات من المزارع المحلية",
      },
      {
        en: "Get back to Tbilisi",
        ar: "العودة إلى تبليسي",
      },
    ],
  },
  {
    title: {
      en: "Day 10",
      ar: "اليوم العاشر",
    },
    description: {
      en: "Explore Tbilisi's Hidden Gems!",
      ar: "اكتشاف جواهر تبليسي المخفية!",
    },
    activities: [
      {
        en: "Visit the European Park (Rike Park) to see the dancing fountain and the famous Bridge of Peace",
        ar: "قم بزيارة الحديقة الأوروبية (حديقة ريكي) لمشاهدة النافورة الراقصة والجسر الشهير جسر السلام",
      },
      {
        en: "Go to the biggest mall in Georgia for shopping",
        ar: "اذهب إلى أكبر مركز تسوق في جورجيا للتسوق",
      },
    ],
  },
];

export const ExtraServices_Text = {
  sectionName: {
    en: "extra services",
    ar: "أسعارنا",
  },

  more1: {
    en: "More",
    ar: "",
  },

  more2: {
    en: "than",
    ar: "",
  },

  more3: {
    en: "just",
    ar: "",
  },

  more4: {
    en: "tourism",
    ar: "",
  },

  exploreSectionIntro: {
    en: "Your Practical Guide in Georgia:",
    ar: "دليلك العملي في جورجيا:",
  },

  exploreSectionIntroAccent: {
    en: "Experience, Learn and Evolve",
    ar: "تجربة، تعلم، وتطور",
  },
};

export const ExtraServicesPackages_Text = [
  {
    slug: "realEstate",
    title: {
      en: "Real estate",
      ar: "استشارات العقارات",
    },
    included: [
      {
        en: "4* hotel",
        ar: "فندق 4 نجوم",
      },
      {
        en: "Premium transportation",
        ar: "نقل بريميوم",
      },
      {
        en: "2 activities per day",
        ar: "نشاطان يومياً",
      },
    ],
    price: "300",
  },
  {
    slug: "medical",
    title: {
      en: "Health",
      ar: "السياحة الطبية",
    },
    included: [
      {
        en: "5* hotel",
        ar: "فندق 5 نجوم",
      },
      {
        en: "Premium transportation",
        ar: "نقل بريميوم",
      },
      {
        en: "3 activities per day",
        ar: "3 أنشطة يومياً",
      },
      {
        en: "Memorable photoshoot",
        ar: "جلسة تصوير لا تُنسى",
      },
    ],
    price: "600",
  },
  {
    slug: "education",
    title: {
      en: "Education",
      ar: "قبول الجامعات",
    },
    included: [
      {
        en: "5* hotel",
        ar: "فندق 5 نجوم",
      },
      {
        en: "VIP transportation",
        ar: "نقل كبار الشخصيات",
      },
      {
        en: "3-4 activities per day",
        ar: "3-4 أنشطة يومياً",
      },
      {
        en: "Real estate advisory",
        ar: "استشارات عقارية",
      },
      {
        en: "Memorable photoshoot",
        ar: "جلسة تصوير لا تُنسى",
      },
      {
        en: "Individually tailored tour",
        ar: "جولة مخصصة بشكل فردي",
      },
    ],
    price: "1000",
  },
];

export const RealEstate_Text = {
  headline: {
    en: "Real estate advisory",
    ar: "استشارات العقارات",
  },
};

export const Medical_Text = {
  headline: {
    en: "Your ultimate medical tourism experience!",
    ar: "السياحة الطبية",
  },
  aboutSectionName: {
    en: "about us",
    ar: "حولنا",
  },
  treatmentsSectionName: {
    en: "treatments",
    ar: "",
  },
  georgiaSectionName: {
    en: "health in Georgia",
    ar: "",
  },
  faqSectionName: {
    en: "how does it work?",
    ar: "",
  },

  introDescription: {
    en: "Discover high-quality medical care in georgia with insightour",
    ar: "",
  },
  introDescriptionAccent: {
    en: "your health is our priority!",
    ar: "",
  },
  benefits: [
    {
      title: {
        en: "Affordable Healthcare",
        ar: "",
      },
      description: {
        en: "Medical treatments in Georgia are significantly cheaper than in many other countries, appealing to those seeking quality care at lower prices",
        ar: "",
      },
    },
    {
      title: {
        en: "Skilled Medical Staff",
        ar: "",
      },
      description: {
        en: "Georgia's healthcare system features well-trained doctors and medical professionals, many of whom have international credentials",
        ar: "",
      },
    },
    {
      title: {
        en: "Easy Access",
        ar: "",
      },
      description: {
        en: "With lenient visa policies, Georgia is accessible for medical travelers from Europe, Asia, and the Middle East",
        ar: "",
      },
    },
    {
      title: {
        en: "Cultural Experiences",
        ar: "",
      },
      description: {
        en: "Patients can enjoy Georgia's rich cultural heritage, historical landmarks, stunning landscapes, and delicious cuisine alongside their medical care",
        ar: "",
      },
    },
    {
      title: {
        en: "Modern Facilities",
        ar: "",
      },
      description: {
        en: "Georgia offers healthcare facilities that meet international standards, with some hospitals accredited by global organizations",
        ar: "",
      },
    },
    {
      title: {
        en: "Accompaniment",
        ar: "",
      },
      description: {
        en: "We will meet you at the airport and arrange your transfer, hotel, and everything necessary for your comfort",
        ar: "",
      },
    },
  ],
  georgiaHealthText: {
    en: "Georgia is rapidly emerging as one of the leading destinations for medical, cosmetic, and dental healthcare services. With the rise in medical tourism, countries like Georgia are becoming valuable resources for individuals seeking high-quality care at remarkably low costs. The country boasts modern medical facilities and highly trained professionals, attracting patients not only from neighboring regions but also from Europe and beyond. In addition to affordability, Georgia offers a rich cultural experience, making it an appealing choice for those combining treatment with travel. As of 2023, the growing number of international patients and expanding healthcare options continue to position Georgia as a prominent player in the global medical tourism market.",
    ar: "",
  },
  selection: [
    {
      slug: "dental",
      icon: ICONS.Tooth,
      shortTitle: {
        en: "Dental",
        ar: "",
      },
      fullTitle: {
        en: "Dental Care",
        ar: "",
      },
      description: {
        en: "Dental treatments such as implants, crowns, veneers, and teeth whitening are commonly sought by international patients.",
        ar: "",
      },
    },
    {
      slug: "cosmetic",
      icon: ICONS.Surgery,
      shortTitle: {
        en: "Cosmetic",
        ar: "",
      },
      fullTitle: {
        en: "Cosmetic and Plastic Surgery",
        ar: "",
      },
      description: {
        en: "Procedures such as rhinoplasty, breast augmentation, liposuction, and facelifts are popular among medical tourists visiting Georgia.",
        ar: "",
      },
    },
    {
      slug: "reproductive",
      icon: ICONS.Baby,
      shortTitle: {
        en: "Reproductive",
        ar: "",
      },
      fullTitle: {
        en: "Reproductive Tourism",
        ar: "",
      },
      description: {
        en: "Georgia has become a popular destination for couples seeking fertility treatments, including in vitro fertilization (IVF) and surrogacy.",
        ar: "",
      },
    },
    {
      slug: "wellness",
      icon: ICONS.Forest,
      shortTitle: {
        en: "Wellness",
        ar: "",
      },
      fullTitle: {
        en: "Wellness and Rehabilitation",
        ar: "",
      },
      description: {
        en: "The country's natural landscapes, including hot springs and therapeutic resorts, attract individuals seeking relaxation, wellness retreats, and rehabilitation services.",
        ar: "",
      },
    },
  ],
  faq: [
    {
      title: {
        en: "STEP 1",
        ar: "",
      },
      headline: {
        en: "Get in touch",
        ar: "",
      },
      description: {
        en: "Upon receiving your inquiry, our team will help you set up a virtual consultation with the doctor. After discussing all the necessary details, our coordinators will present you with a comprehensive surgery plan, covering costs and logistics.",
        ar: "",
      },
    },
    {
      title: {
        en: "STEP 2",
        ar: "",
      },
      headline: {
        en: "Travel options",
        ar: "",
      },
      description: {
        en: "Feel free to ask for personalized travel arrangements, including leisure activities in Tbilisi and day excursions, tailored to fit your surgical timeline.",
        ar: "",
      },
    },
    {
      title: {
        en: "STEP 3",
        ar: "",
      },
      headline: {
        en: "Lodging arrangements",
        ar: "",
      },
      description: {
        en: "We are happy to provide you with exclusive rates at one of our partner hotels conveniently located within walking distance from the hospital.",
        ar: "",
      },
    },
    {
      title: {
        en: "STEP 4",
        ar: "",
      },
      headline: {
        en: "Final confirmation",
        ar: "",
      },
      description: {
        en: "Before you leave, we will send you a confirmation that includes your appointment details, reservations, travel plans, and lodging arrangements.",
        ar: "",
      },
    },
  ],
};

export const Education_Text = {
  headline: {
    en: "University admissions",
    ar: "قبول الجامعات",
  },
};

export const Footer_Text = {
  acceptCrypto: {
    en: "We accept crypto!",
    ar: "!نقبل العملات الرقمية",
  },
  legal: {
    en: "Legal",
    ar: "المعلومات القانونية",
  },
  address: {
    en: "Tbilisi Guramishvili Ave N 78",
    ar: "",
  },
};
