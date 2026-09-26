import type { ImageKey } from "@/lib/site-settings";

export interface ServiceFeature {
  icon: string;
  title: string;
  text: string;
}

export interface ServiceStep {
  title: string;
  text: string;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServicePageContent {
  slug: string;
  name: string;
  heroTitle: string;
  kicker: string;
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
  heroImage: ImageKey;
  introHeading: string;
  intro: string[];
  featuresHeading: string;
  features: ServiceFeature[];
  processHeading: string;
  process: ServiceStep[];
  faqHeading: string;
  faqs: ServiceFaq[];
  projectsHeading: string;
  /** Case-insensitive substrings matched against the project category. */
  projectKeywords: string[];
}

export const SERVICE_PAGES: ServicePageContent[] = [
  {
    slug: "website-design",
    name: "Website Design",
    heroTitle: "Website Design Services in Kenya",
    kicker: "Website Design",
    subtitle:
      "Professional website designers in Kenya — custom, mobile-friendly websites that load fast, look great and bring you customers.",
    metaTitle: "Website Design in Kenya",
    metaDescription:
      "Professional website designers in Kenya. Custom, mobile-friendly business websites with fast loading, SEO and maintenance. Get a free quote today.",
    heroImage: "hero_services",
    introHeading: "Your Business Deserves a Website That Works",
    intro: [
      "A professional website is the difference between a business that gets calls and one that gets ignored. We design and build custom, modern websites for Kenyan businesses — from local shops in Narok to companies serving clients nationwide and beyond.",
      "Every site we build is mobile-first, fast-loading and search-engine ready. You get a website that looks great on a phone in Mombasa and a desktop in Nairobi, loads in seconds even on slower connections, and is structured so Google can find and rank it.",
      "We handle everything: domain and hosting setup, business email, contact forms, WhatsApp integration, Google Maps and analytics. You tell us about your business, and we take care of the rest.",
    ],
    featuresHeading: "What a Brevan Website Includes",
    features: [
      {
        icon: "fas fa-mobile-alt",
        title: "Mobile-First Design",
        text: "Designed and tested on phones first, because most Kenyans browse on mobile. Looks and works perfectly on any screen size.",
      },
      {
        icon: "fas fa-tachometer-alt",
        title: "Fast Loading",
        text: "Optimized images and clean code mean your site loads in seconds, even on slower connections — which also helps your Google ranking.",
      },
      {
        icon: "fas fa-search",
        title: "SEO-Ready Structure",
        text: "Built for search engines from day one with clean markup, fast loading and keyword-friendly content so customers can find you.",
      },
      {
        icon: "fas fa-envelope-open-text",
        title: "Business Email",
        text: "Set up a professional email like you@yourbusiness.co.ke so you look credible in every enquiry.",
      },
      {
        icon: "fab fa-whatsapp",
        title: "WhatsApp & Contact Forms",
        text: "Contact forms and WhatsApp chat buttons so customers can reach you the way they already communicate.",
      },
      {
        icon: "fas fa-map-marked-alt",
        title: "Maps & Analytics",
        text: "Google Maps so customers find you, plus analytics so you can see who is visiting and what they look at.",
      },
    ],
    processHeading: "How We Build Your Website",
    process: [
      {
        title: "1. Discovery",
        text: "We learn about your business, your audience and your goals, and agree on the pages and features you need.",
      },
      {
        title: "2. Design",
        text: "We design a clean, on-brand layout that you review and approve before any development starts.",
      },
      {
        title: "3. Build",
        text: "We develop and optimize the site, add your content and images, and test it on phones and desktops.",
      },
      {
        title: "4. Launch & Support",
        text: "We go live, set up email and analytics, train you to manage the site, and stay on call for updates.",
      },
    ],
    faqHeading: "Common Questions About Website Design",
    faqs: [
      {
        question: "How much does a website cost in Kenya?",
        answer:
          "A standard business website typically costs between KES 15,000 and KES 45,000 depending on the number of pages and features you need. E-commerce stores and custom platforms are quoted separately. We give you a clear, fixed quote before we start — no hidden charges.",
      },
      {
        question: "How long does it take to build my website?",
        answer:
          "Most business websites are ready within 1–2 weeks of design approval. Larger projects such as online stores or booking systems take 3–6 weeks depending on the scope.",
      },
      {
        question: "Do I need hosting and a domain name?",
        answer:
          "Yes, your website needs a domain (for example yourbusiness.co.ke) and hosting. We set both up for you and explain the annual renewal costs, or you can buy them yourself and we handle the technical setup.",
      },
      {
        question: "Can I update the website myself later?",
        answer:
          "Yes. We build sites with easy content management and train you to update text, images and products yourself. We also offer maintenance plans if you prefer that we handle all updates.",
      },
      {
        question: "Will my website work well on mobile phones?",
        answer:
          "Yes — every site is designed and tested mobile-first. Your website will look sharp and work smoothly on any phone, tablet or computer.",
      },
      {
        question: "Do you help with Google search (SEO)?",
        answer:
          "We structure every site to be search-friendly from day one — fast loading, clean code and keyword-focused content. Optional SEO packages add keyword research, blog writing and Google Business Profile setup.",
      },
    ],
    projectsHeading: "Websites We've Built",
    projectKeywords: ["website", "web design", "web"],
  },
  {
    slug: "school-management",
    name: "School Management Systems",
    heroTitle: "School Management Software in Kenya",
    kicker: "School Management",
    subtitle:
      "School management software for Kenyan schools — students, fees, examinations, report cards and staff records in one simple cloud system.",
    metaTitle: "School Management Software in Kenya",
    metaDescription:
      "School management software for Kenyan schools — fees, examinations, report cards, students and staff records in one system. Book a free demo and quote today.",
    heroImage: "hero_1",
    introHeading: "One System for the Whole School",
    intro: [
      "Running a school means managing students, fees, exams, staff and endless records. Our school management systems bring all of that into one simple, cloud-based platform built for how Kenyan schools actually work.",
      "From fee invoicing and M-Pesa payment tracking to exam entry, grading and automatic report cards, your admin team saves hours every week and parents get accurate, timely information.",
      "The system runs in any browser on phones, tablets and computers, so administrators and teachers can work from the office or from home — with no special hardware required.",
    ],
    featuresHeading: "Everything Your School Needs",
    features: [
      {
        icon: "fas fa-user-graduate",
        title: "Student & Staff Records",
        text: "Complete registers for students and staff with photos, contacts, guardians and history — all in one searchable place.",
      },
      {
        icon: "fas fa-coins",
        title: "Fee Invoicing & M-Pesa Tracking",
        text: "Issue fee invoices, record M-Pesa and cash payments, and see exactly who has paid and who is owing — in real time.",
      },
      {
        icon: "fas fa-clipboard-check",
        title: "Exams, Grading & Report Cards",
        text: "Enter continuous assessment and exam marks, compute totals automatically and generate report cards in seconds.",
      },
      {
        icon: "fas fa-calendar-alt",
        title: "Timetables & Classes",
        text: "Plan class allocations, teacher timetables and term calendars without the back-and-forth of spreadsheets.",
      },
      {
        icon: "fas fa-comments",
        title: "Parent Communication",
        text: "Send SMS, WhatsApp and email updates to parents about fees, results, meetings and school events.",
      },
      {
        icon: "fas fa-shield-alt",
        title: "Secure & Role-Based",
        text: "Admins, teachers and parents each get their own level of access, and your data is backed up securely.",
      },
    ],
    processHeading: "How We Get Your School Set Up",
    process: [
      {
        title: "1. Needs Assessment",
        text: "We review how your school currently keeps records and agree on the modules and workflows you need.",
      },
      {
        title: "2. Setup & Data Import",
        text: "We configure the system and import your existing students, staff and fee structures.",
      },
      {
        title: "3. Training",
        text: "We train your admin team and teachers so everyone is confident before you go live.",
      },
      {
        title: "4. Ongoing Support",
        text: "We provide backups, updates and responsive support whenever your school needs help.",
      },
    ],
    faqHeading: "Common Questions About School Software",
    faqs: [
      {
        question: "What does a school management system include?",
        answer:
          "Student and staff records, fee management with payment tracking, exams and grading, report cards, timetables and parent communication. We customize workflows for primary, secondary and pre-schools so it matches how your school operates.",
      },
      {
        question: "Can it track M-Pesa fee payments?",
        answer:
          "Yes. Fee payments can be recorded manually or matched with M-Pesa statements, so the accounts office sees exactly who has paid and who hasn't at any time.",
      },
      {
        question: "Does it work on phones?",
        answer:
          "Yes. It runs in the browser on phones, tablets and computers, so teachers and administrators can work from anywhere — no special hardware is needed.",
      },
      {
        question: "How hard is it for teachers to learn?",
        answer:
          "We train your staff and provide guides and support. The interface is simple, and most teachers are comfortable after a day or two of use.",
      },
      {
        question: "Is our school data safe?",
        answer:
          "Yes. Your data is stored securely with regular backups, and each user only sees what their role allows — admins, teachers and parents each have their own access level.",
      },
      {
        question: "How much does school management software cost?",
        answer:
          "Pricing depends on the size of your school and the modules you choose. We give schools a clear quotation based on enrollment and requirements — contact us for a free demo and quote.",
      },
    ],
    projectsHeading: "Schools We've Digitized",
    projectKeywords: ["school"],
  },
  {
    slug: "pos-systems",
    name: "POS Systems",
    heroTitle: "POS Systems for Shops in Kenya",
    kicker: "POS Systems",
    subtitle:
      "Modern POS systems for shops in Kenya — fast sales, stock control, M-Pesa payments, receipts and reports in one offline-ready system.",
    metaTitle: "POS Systems for Shops in Kenya",
    metaDescription:
      "POS systems for shops in Kenya — fast sales, stock control, M-Pesa and card payments, receipts and daily reports. Works offline. Get a free quote today.",
    heroImage: "hero_2",
    introHeading: "Run Your Shop Smarter With a Modern POS",
    intro: [
      "A modern POS does far more than print receipts. For Kenyan shops, restaurants and retail stores, our POS systems handle sales, stock, M-Pesa and card payments, and daily reports — all from one fast, offline-ready system.",
      "When the network drops, your business does not stop: the system keeps working and automatically syncs once you are back online, so you never lose a sale.",
      "You can start with just a smartphone or tablet and a receipt printer, and grow from there. We help you choose reliable, affordable hardware and train you and your staff.",
    ],
    featuresHeading: "What Your POS System Includes",
    features: [
      {
        icon: "fas fa-bolt",
        title: "Fast Sales & Receipts",
        text: "Ring up sales in seconds and print or send receipts — even with long queues at rush hour.",
      },
      {
        icon: "fas fa-mobile-alt",
        title: "M-Pesa & Card Payments",
        text: "Accept Lipa na M-Pesa and card payments and reconcile them against each sale automatically.",
      },
      {
        icon: "fas fa-boxes",
        title: "Stock Control",
        text: "Track quantities per product, get low-stock alerts, and see which items are your best sellers.",
      },
      {
        icon: "fas fa-chart-line",
        title: "Daily Sales Reports",
        text: "See sales, profit and payments per day, per cashier or per product — no more manual counting.",
      },
      {
        icon: "fas fa-users",
        title: "Multi-User Access",
        text: "Multiple cashiers with their own PINs and permissions, with the manager seeing everything in one report.",
      },
      {
        icon: "fas fa-wifi",
        title: "Offline Mode",
        text: "Keep selling when the internet goes down — everything syncs automatically when the connection returns.",
      },
    ],
    processHeading: "How We Set Up Your POS",
    process: [
      {
        title: "1. Consultation",
        text: "We understand your shop layout, sales process and the products you sell.",
      },
      {
        title: "2. Setup",
        text: "We install the software on your devices and load your products, prices and stock.",
      },
      {
        title: "3. Training",
        text: "We train you and your staff on sales, stock, M-Pesa and reporting.",
      },
      {
        title: "4. Go Live & Support",
        text: "We launch your system, then support you with fixes, updates and advice.",
      },
    ],
    faqHeading: "Common Questions About POS Systems",
    faqs: [
      {
        question: "How much does a POS system cost in Kenya?",
        answer:
          "Our POS packages start from about KES 20,000 for software, setup and training, with options to rent or buy hardware such as receipt printers and cash drawers. We give you a clear price list before you commit, and the basic plan has no hidden monthly fees.",
      },
      {
        question: "Does the POS accept M-Pesa payments?",
        answer:
          "Yes. It supports Lipa na M-Pesa and can also record cash, card and credit sales. Payment confirmations can be matched automatically to each transaction.",
      },
      {
        question: "What happens if the internet goes down?",
        answer:
          "The system keeps working offline. Sales and stock continue as normal, and everything syncs automatically once your connection returns, so you never lose a sale.",
      },
      {
        question: "Can it track stock and warn me about low items?",
        answer:
          "Yes. Every product tracks quantity, and you receive low-stock alerts before you run out. You can also see which products sell fastest and when to reorder.",
      },
      {
        question: "Do I need special equipment?",
        answer:
          "You can start with a smartphone or tablet and a receipt printer. We help you choose affordable, reliable hardware that fits your shop and budget.",
      },
      {
        question: "Can more than one person use it at the same time?",
        answer:
          "Yes. Multiple users can sell at the same time, each with their own PIN and permissions, and the manager can see all sales in one report.",
      },
    ],
    projectsHeading: "Stores Running on Our POS",
    projectKeywords: ["pos", "retail"],
  },
  {
    slug: "e-commerce",
    name: "E-Commerce",
    heroTitle: "Online Store Development in Kenya",
    kicker: "E-Commerce",
    subtitle:
      "Online store development in Kenya — secure shops with M-Pesa and card payments, easy product management and order tracking.",
    metaTitle: "Online Store Development in Kenya",
    metaDescription:
      "Online store development in Kenya. Secure e-commerce websites with M-Pesa and card payments, product management and order tracking. Get a free quote today.",
    heroImage: "hero_3",
    introHeading: "Start Selling Online From Day One",
    intro: [
      "Launch a secure online store and start selling to customers anywhere in Kenya and beyond. We build e-commerce websites with easy product management, mobile money and card payments, and order tracking.",
      "We do not just install a theme and leave you. We set up your payments, delivery, product catalog and training, so your store is ready for real orders on launch day.",
      "Whether you are a shop going online, a manufacturer with a catalog, or a service business taking bookings and deposits, we build a store that fits the way you sell.",
    ],
    featuresHeading: "What Your Online Store Includes",
    features: [
      {
        icon: "fas fa-shopping-cart",
        title: "Easy Storefront",
        text: "A clean, mobile-first store where customers can browse, search and buy without friction.",
      },
      {
        icon: "fas fa-mobile-alt",
        title: "M-Pesa & Card Payments",
        text: "Lipa na M-Pesa (STK push), card payments and cash on delivery, with automatic order confirmation.",
      },
      {
        icon: "fas fa-boxes",
        title: "Product & Stock Management",
        text: "Unlimited products, categories, sizes and colors, with stock levels updated as orders come in.",
      },
      {
        icon: "fas fa-clipboard-list",
        title: "Order Tracking",
        text: "Manage orders from checkout to delivery and keep customers informed at every step.",
      },
      {
        icon: "fas fa-truck",
        title: "Delivery & Pickup",
        text: "Configure delivery zones and rates with your couriers, or local pickup for your customers.",
      },
      {
        icon: "fas fa-graduation-cap",
        title: "Training Included",
        text: "We train you to add products, change prices and manage orders yourself — no coding needed.",
      },
    ],
    processHeading: "How We Launch Your Store",
    process: [
      {
        title: "1. Planning",
        text: "We map your products, payment methods, delivery and the goals you want your store to reach.",
      },
      {
        title: "2. Design & Build",
        text: "We build a store that is on-brand and simple for customers to use on any device.",
      },
      {
        title: "3. Payments & Delivery",
        text: "We configure M-Pesa, cards and your delivery flow, and test everything end-to-end.",
      },
      {
        title: "4. Launch & Handover",
        text: "We add your products, process a real test order and train you to run the store yourself.",
      },
    ],
    faqHeading: "Common Questions About Online Stores",
    faqs: [
      {
        question: "How do customers pay with M-Pesa on my store?",
        answer:
          "We integrate Lipa na M-Pesa (M-Pesa Express / STK push) so customers are prompted to approve payment directly on their phone at checkout. Payments can be confirmed automatically against each order.",
      },
      {
        question: "How much does an online store cost in Kenya?",
        answer:
          "A professionally built online store typically starts from KES 35,000, including design, development, payment integration and launch support. Hosting and payment transaction fees are separate, and we provide a clear breakdown before starting.",
      },
      {
        question: "Can I sell outside Kenya?",
        answer:
          "Yes. We can add international card payments and configure shipping rates for different regions, so you can sell locally and to customers abroad.",
      },
      {
        question: "Do I need to know how to code?",
        answer:
          "No. We train you to add products, update prices and manage orders from an easy dashboard. You can run the entire store yourself.",
      },
      {
        question: "How long before my store can start taking orders?",
        answer:
          "Most stores go live within 2–4 weeks. Before launch, we process a real test order end-to-end so your first customer gets a smooth experience.",
      },
      {
        question: "How do deliveries work?",
        answer:
          "We set up delivery or pickup options with your preferred couriers, and clearly show delivery fees and timelines to customers at checkout.",
      },
    ],
    projectsHeading: "Stores We've Built",
    projectKeywords: ["commerce", "store", "shop"],
  },
  {
    slug: "ai-automation",
    name: "AI Automation",
    heroTitle: "AI Automation Services in Kenya",
    kicker: "AI Automation",
    subtitle:
      "AI automation services in Kenya — chatbots, WhatsApp automation and smart workflows that cut repetitive work for businesses and schools.",
    metaTitle: "AI Automation Services in Kenya",
    metaDescription:
      "AI automation services in Kenya — chatbots, WhatsApp automation and smart workflows that save hours for businesses and schools. Get a free consultation today.",
    heroImage: "hero_projects",
    introHeading: "Put AI to Work in Your Daily Operations",
    intro: [
      "Artificial intelligence is not just for big tech companies. We help Kenyan schools and businesses put AI to work in their daily operations — chatbots that answer customers, workflows that save hours, and tools your team actually uses.",
      "We focus on practical automation: wherever you spend time repeating the same work, we build a system that does it faster. You measure the savings in hours, not hype.",
      "Every project starts with a discovery session in which we map your repetitive tasks and recommend the highest-impact automation for your budget.",
    ],
    featuresHeading: "Practical AI Solutions We Deliver",
    features: [
      {
        icon: "fas fa-robot",
        title: "AI Chatbots",
        text: "Chatbots that answer customer questions on your website 24/7 and hand complex enquiries to your team.",
      },
      {
        icon: "fab fa-whatsapp",
        title: "WhatsApp Automation",
        text: "Automated WhatsApp replies, orders and enquiries so customers get instant responses on the app they already use.",
      },
      {
        icon: "fas fa-cogs",
        title: "Workflow Automation",
        text: "Automate forms, follow-ups, invoicing and reporting so your team stops doing the same data entry every day.",
      },
      {
        icon: "fas fa-file-alt",
        title: "AI Content & Documents",
        text: "Drafting assistants for reports, proposals, marketing copy and school documents — faster and consistent.",
      },
      {
        icon: "fas fa-chart-pie",
        title: "Dashboards & Reporting",
        text: "Live dashboards that replace manual spreadsheets, so decisions are based on up-to-date data.",
      },
      {
        icon: "fas fa-users-cog",
        title: "Staff Training",
        text: "Hands-on training so your existing team can use and benefit from the AI tools we deliver.",
      },
    ],
    processHeading: "How We Automate Your Work",
    process: [
      {
        title: "1. Discovery",
        text: "We map your repetitive tasks, bottlenecks and the work your team spends the most time on.",
      },
      {
        title: "2. Plan",
        text: "We recommend the highest-impact automations and give you a clear cost and timeline.",
      },
      {
        title: "3. Build",
        text: "We build and test the chatbot, workflow or dashboard together with your team.",
      },
      {
        title: "4. Train & Support",
        text: "We train your staff, measure the results and support you as the automation runs.",
      },
    ],
    faqHeading: "Common Questions About AI Automation",
    faqs: [
      {
        question: "What can AI automation do for my business?",
        answer:
          "Typical wins include chatbots that answer customers 24/7 on your website or WhatsApp, automated lead capture and follow-up, document and report drafting, and dashboards that replace manual spreadsheets. We start with one high-impact process and build from there.",
      },
      {
        question: "Do I need technical staff to use it?",
        answer:
          "No. We build the systems and train your existing team. The tools we deliver are designed to be used by non-technical staff.",
      },
      {
        question: "Is AI expensive for a small business?",
        answer:
          "Not necessarily. Many AI tools run on affordable monthly plans, and we design solutions that fit your budget. You get a fixed setup quote, and you control the ongoing costs.",
      },
      {
        question: "Which AI tools do you use?",
        answer:
          "We use proven models such as OpenAI and Google AI, the WhatsApp Business API and popular workflow platforms — chosen to match your needs and budget rather than a one-size-fits-all approach.",
      },
      {
        question: "How do you keep our data safe?",
        answer:
          "We follow data protection best practices, keep client data out of public AI models where required, and clearly document what data your automations use and store.",
      },
      {
        question: "How soon can we see results?",
        answer:
          "Simple automations are often live within 1–2 weeks. We set up measurement from day one so you can see the hours saved and the difference it makes.",
      },
    ],
    projectsHeading: "AI Projects in Action",
    projectKeywords: ["ai", "automation"],
  },
];

export function getServicePage(slug: string): ServicePageContent | null {
  return SERVICE_PAGES.find((page) => page.slug === slug) ?? null;
}