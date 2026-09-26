export const locales = ["bn", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "bn";
export const LOCALE_COOKIE = "lang";

export type VariantKey = "red" | "burgundy" | "lavender";

const bn = {
  meta: {
    title: "INNORAᴮᴰ - ড্রিম হানিমুন কক্সবাজার মেগা ক্যাম্পেইন",
    description:
      "INNORAᴮᴰ-এর প্রিমিয়াম নাইটওয়্যার ৫৯৯ টাকায় কিনে পান কক্সবাজার ড্রিম হানিমুন লটারি টিকিট। সম্পূর্ণ পেমেন্টে ফ্রি ডেলিভারি, ক্যাশ অন ডেলিভারিতে ডেলিভারি চার্জ ১০০ টাকা।",
  },
  ticker:
    "🔥 মেগা অফার: আজই প্রিমিয়াম নাইটওয়্যার অর্ডার করে জিতে নিন সম্পূর্ণ ফ্রি কক্সবাজার ড্রিম হানিমুন ট্যুর!",
  switchLang: "English",
  hero: {
    pill: "ড্রিম হানিমুন কক্সবাজার ক্যাম্পেইন",
    titleBefore: "মাত্র ৫৯৯ টাকায় ",
    titleHighlight: "কক্সবাজার হানিমুন ট্যুর",
    titleAfter: " কি সত্যিই সম্ভব?",
    lead: {
      a: "হ্যাঁ, ১০০% সম্ভব! ",
      b: "-এর প্রিমিয়াম ১২৫০ টাকার ড্রেস মাত্র ৫৯৯ টাকায় কিনলেই পাচ্ছেন অফিশিয়াল ",
      ticket: '"ড্রিম হানিমুন লটারি টিকিট"',
      c: "। বিজয়ী কাপল পাবেন সম্পূর্ণ ফ্রি অল-ইনক্লুসিভ লাক্সারি ট্যুর (সম্ভাব্য খরচ ৬৫,০০০৳ - ৮৫,০০০৳)!",
    },
    hours: "ঘণ্টা",
    minutes: "মিনিট",
    seconds: "সেকেন্ড",
    cta: "অর্ডার করুন ও লটারি টিকিট জিতুন",
  },
  product: {
    heading: "INNORA™ এক্সক্লুসিভ লাক্সারি কালেকশন",
    subheading: "আপনার পছন্দের কালার নির্বাচন করুন এবং অফার মূল্যে অর্ডার নিশ্চিত করুন",
    kicker: "প্রিমিয়াম সামার ২-পিস নচ-কলার সেট",
    discount: (pct: string) => `${pct}% ডিসকাউন্ট`,
    description:
      "উচ্চমানের ব্রিদেবল সুতি-সাটিন ফেব্রিকে তৈরি আরামদায়ক ক্যাজুয়াল লাউঞ্জওয়্যার। প্রতিটি অর্ডারের সাথে পাচ্ছেন নিশ্চিত হানিমুন ক্যাম্পেইন লটারি কুপন।",
    paletteTitle: "কালার ভ্যারিয়েন্ট সিলেক্ট করুন:",
    cta: "এই ড্রেসটি বুক করুন",
    variants: {
      red: { title: "চেরি রেড লেস সাটিন সেট", label: "চেরি রেড" },
      burgundy: { title: "রয়্যাল বার্গান্ডি লেস সাটিন সেট", label: "বার্গান্ডি" },
      lavender: { title: "সফট ল্যাভেন্ডার লেস সাটিন সেট", label: "ল্যাভেন্ডার" },
    } satisfies Record<VariantKey, { title: string; label: string }>,
  },
  ticket: {
    pill: "অফিশিয়াল ক্যাম্পেইন টোকেন",
    heading: "ড্রিম হানিমুন কক্সবাজার ক্যাম্পেইন টিকিট",
    body: "আপনার অর্ডারের প্রতিটি প্যাকেটে পাঠানো হবে এরকম ইউনিক সিরিয়াল নম্বরযুক্ত অফিশিয়াল ফিজিক্যাল টিকিট।",
    imgAlt: "কক্সবাজার ক্যাম্পেইন টিকিট ডিজাইন",
    specialLabel: "বিশেষ সুযোগ:",
    specialText: "১টি ড্রেস অর্ডার করলে পাবেন ১টি টিকিট, কিন্তু ",
    specialStrong: "২টি ড্রেস কিনলে সরাসরি ৩টি টিকিট!",
  },
  follow: {
    heading: "📢 লটারির ড্র ও ফলাফল জানতে আমাদের পেজ ফলো করুন!",
    body: "বিজয়ী কাপলের নাম সরাসরি আমাদের অফিসিয়াল ফেসবুক পেজ থেকে লাইভ ড্র-এর মাধ্যমে ঘোষণা করা হবে।",
    cta: "আমাদের ফেসবুক পেজ ফলো করুন",
  },
  checkout: {
    heading: "অর্ডার সম্পন্ন করুন",
    subheading: "ক্যাম্পেইনে অংশ নিতে নিচের ফর্মটি পূরণ করুন",
    selectedItems: "🎁 নির্বাচিত আইটেম:",
    pieces: "টি",
    totalTickets: "প্রাপ্ত মোট লটারি টিকিট:",
    qtyLabel: "অর্ডারের পরিমাণ (কম্বো অফার):",
    namePh: "আপনার সম্পূর্ণ নাম *",
    phonePh: "১১ ডিজিটের মোবাইল নম্বর *",
    addressPh: "ডেলিভারি ঠিকানা (বাসা/রোড, থানা, জেলা) *",
    paymentTitle: "পেমেন্ট পদ্ধতি নির্বাচন করুন:",
    cod: "ক্যাশ অন ডেলিভারি",
    codFee: (fee: string) => ` (ডেলিভারি চার্জ ৳${fee})`,
    advance: "অগ্রিম পেমেন্ট (বিকাশ / নগদ)",
    advanceFee: "ডেলিভারি সম্পূর্ণ ফ্রি! (৳০)",
    grandTotal: "সর্বমোট বিল:",
    submitCod: (amt: string) => `অর্ডার নিশ্চিত করুন (৳${amt})`,
    submitAdvance: (amt: string) => `এখনই পেমেন্ট কনফার্ম করুন (৳${amt})`,
    submitting: "অপেক্ষা করুন...",
  },
  popup: {
    close: "বন্ধ করুন",
    stockBefore: "⚠️ আজকের মেগা ক্যাম্পেইনের টিকিট আর মাত্র ",
    stockAfter: " টি বাকি!",
    heading: "আপনার ড্রিম হানিমুন টিকিট মিস করবেন না!",
    body: "আজকের স্টক শেষ হওয়ার আগেই ৫৯৯ টাকায় ড্রেস বুক করে টিকিট সংগ্রহ করুন।",
    cta: "এখনই অর্ডার করুন",
  },
  pay: {
    heading: "অগ্রিম পেমেন্ট কনফার্মেশন",
    amountLabel: "প্রদেয় মোট টাকা:",
    freeDelivery: "(ডেলিভারি চার্জ ফ্রি)",
    bkashTab: "bKash (বিকাশ)",
    nagadTab: "Nagad (নগদ)",
    bkashNumber: "বিকাশ পার্সোনাল নম্বর:",
    nagadNumber: "নগদ পার্সোনাল নম্বর:",
    copy: "কপি করুন",
    copied: (num: string) => `নম্বর কপি করা হয়েছে: ${num}`,
    instructionsTitle: "পেমেন্ট নির্দেশনা:",
    step1a: "উপরে দেওয়া নম্বরে আপনার অ্যাকাউন্ট থেকে সম্পূর্ণ টাকা ",
    step1b: " করুন।",
    step2a: "টাকা পাঠানোর পর প্রাপ্ত ",
    step2b: " টি কপি করুন।",
    step3: "নিচের ঘরে আপনার প্রেরক নম্বর ও TrxID বসিয়ে অর্ডার কনফার্ম করুন।",
    senderPh: "যে নম্বর থেকে টাকা পাঠিয়েছেন *",
    trxPh: "Transaction ID (TrxID) এখানে পেস্ট করুন *",
    submit: "পেমেন্ট ভেরিফাই ও অর্ডার কনফার্ম করুন",
  },
  success: {
    heading: "ধন্যবাদ! আপনার অর্ডারটি গ্রহণ করা হয়েছে",
    cod: "ক্যাশ অন ডেলিভারিতে আপনার অর্ডারটি গ্রহণ করা হয়েছে। পার্সেলের সাথে আপনার অফিশিয়াল হানিমুন টিকিট পৌঁছে যাবে।",
    advance: "পেমেন্ট তথ্য গৃহীত হয়েছে! আপনার অর্ডার সফল হয়েছে এবং টিকিটসহ পার্সেলটি দ্রুত পাঠিয়ে দেওয়া হবে।",
    orderNumber: "অর্ডার নম্বর:",
    tickets: "আপনার টিকিট সিরিয়াল:",
    total: "সর্বমোট:",
    ok: "ঠিক আছে",
  },
  errors: {
    generic: "দুঃখিত, অর্ডারটি সম্পন্ন করা যায়নি। আবার চেষ্টা করুন।",
    duplicateTrx: "এই TrxID দিয়ে আগেই একটি অর্ডার করা হয়েছে।",
    invalid: "অনুগ্রহ করে সঠিক তথ্য দিন (মোবাইল নম্বর ০১ দিয়ে শুরু ১১ ডিজিট)।",
  },
  footer: {
    address: "📍 ঠিকানা: খুলনা সদর, খুলনা, বাংলাদেশ | 📞 হটলাইন: +880 1989-399 740",
    rights: "© 2026 INNORA BD™. All Rights Reserved.",
  },
};

export type Dictionary = typeof bn;

const en: Dictionary = {
  meta: {
    title: "INNORAᴮᴰ - Dream Honeymoon Cox's Bazar Mega Campaign",
    description:
      "Buy INNORAᴮᴰ nightwear for ৳599 and get a lottery ticket for a chance to win a Cox's Bazar honeymoon for two. Free delivery with full payment; ৳100 delivery for COD.",
  },
  ticker:
    "🔥 Mega Offer: Order premium nightwear today and win a completely FREE Cox's Bazar dream honeymoon tour!",
  switchLang: "বাংলা",
  hero: {
    pill: "Dream Honeymoon Cox's Bazar Campaign",
    titleBefore: "A ",
    titleHighlight: "Cox's Bazar Honeymoon Tour",
    titleAfter: " for just ৳599 — is it really possible?",
    lead: {
      a: "Yes, 100% possible! Buy a premium ৳1250 dress from ",
      b: " for only ৳599 and get an official ",
      ticket: '"Dream Honeymoon Lottery Ticket"',
      c: ". The winning couple gets a completely free all-inclusive luxury tour (estimated value ৳65,000 - ৳85,000)!",
    },
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    cta: "Order Now & Win a Lottery Ticket",
  },
  product: {
    heading: "INNORA™ Exclusive Luxury Collection",
    subheading: "Choose your favourite colour and confirm your order at the offer price",
    kicker: "Premium Summer 2-Piece Notch-Collar Set",
    discount: (pct: string) => `${pct}% OFF`,
    description:
      "Comfortable casual loungewear made from high-quality breathable cotton-satin fabric. Every order comes with a guaranteed honeymoon campaign lottery coupon.",
    paletteTitle: "Select a colour variant:",
    cta: "Book This Dress",
    variants: {
      red: { title: "Cherry Red Lace Satin Set", label: "Cherry Red" },
      burgundy: { title: "Royal Burgundy Lace Satin Set", label: "Burgundy" },
      lavender: { title: "Soft Lavender Lace Satin Set", label: "Lavender" },
    },
  },
  ticket: {
    pill: "Official Campaign Token",
    heading: "Dream Honeymoon Cox's Bazar Campaign Ticket",
    body: "Every package in your order will include an official physical ticket like this, with a unique serial number.",
    imgAlt: "Cox's Bazar campaign ticket design",
    specialLabel: "Special deal:",
    specialText: "Order 1 dress and get 1 ticket, but ",
    specialStrong: "buy 2 dresses and get 3 tickets!",
  },
  follow: {
    heading: "📢 Follow our page for the lottery draw and results!",
    body: "The winning couple will be announced via a live draw on our official Facebook page.",
    cta: "Follow Our Facebook Page",
  },
  checkout: {
    heading: "Complete Your Order",
    subheading: "Fill in the form below to join the campaign",
    selectedItems: "🎁 Selected items:",
    pieces: "",
    totalTickets: "Total lottery tickets earned:",
    qtyLabel: "Order quantity (combo offer):",
    namePh: "Your full name *",
    phonePh: "11-digit mobile number *",
    addressPh: "Delivery address (house/road, thana, district) *",
    paymentTitle: "Choose a payment method:",
    cod: "Cash on Delivery",
    codFee: (fee: string) => ` (delivery charge ৳${fee})`,
    advance: "Advance Payment (bKash / Nagad)",
    advanceFee: "Delivery completely FREE! (৳0)",
    grandTotal: "Grand total:",
    submitCod: (amt: string) => `Confirm Order (৳${amt})`,
    submitAdvance: (amt: string) => `Confirm Payment Now (৳${amt})`,
    submitting: "Please wait...",
  },
  popup: {
    close: "Close",
    stockBefore: "⚠️ Only ",
    stockAfter: " tickets left in today's mega campaign!",
    heading: "Don't miss your dream honeymoon ticket!",
    body: "Book a dress for ৳599 and grab your ticket before today's stock runs out.",
    cta: "Order Now",
  },
  pay: {
    heading: "Advance Payment Confirmation",
    amountLabel: "Total payable:",
    freeDelivery: "(free delivery)",
    bkashTab: "bKash",
    nagadTab: "Nagad",
    bkashNumber: "bKash personal number:",
    nagadNumber: "Nagad personal number:",
    copy: "Copy",
    copied: (num: string) => `Number copied: ${num}`,
    instructionsTitle: "Payment instructions:",
    step1a: "",
    step1b: " the full amount from your account to the number above.",
    step2a: "After sending, copy the ",
    step2b: " you receive.",
    step3: "Enter your sender number and TrxID below to confirm the order.",
    senderPh: "Number you sent the money from *",
    trxPh: "Paste the Transaction ID (TrxID) here *",
    submit: "Verify Payment & Confirm Order",
  },
  success: {
    heading: "Thank you! Your order has been received",
    cod: "Your cash-on-delivery order has been received. Your official honeymoon ticket will arrive with the parcel.",
    advance: "Payment details received! Your order was successful and the parcel with your tickets will be shipped shortly.",
    orderNumber: "Order number:",
    tickets: "Your ticket serials:",
    total: "Total:",
    ok: "OK",
  },
  errors: {
    generic: "Sorry, we couldn't place your order. Please try again.",
    duplicateTrx: "An order with this TrxID already exists.",
    invalid: "Please enter valid details (mobile number: 11 digits starting with 01).",
  },
  footer: {
    address: "📍 Address: Khulna Sadar, Khulna, Bangladesh | 📞 Hotline: +880 1989-399 740",
    rights: "© 2026 INNORA BD™. All Rights Reserved.",
  },
};

export const dictionaries: Record<Locale, Dictionary> = { bn, en };

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}
