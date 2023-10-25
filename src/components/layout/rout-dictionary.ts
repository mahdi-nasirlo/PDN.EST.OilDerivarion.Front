interface Items {
  [key: string]: {
    title: string;
    href?: string;
  };
}

export const routDictionary: Items = {
  dashboard: {
    title: "پیشخوان",
  },
  "request-detail": {
    title: "جزئیات درخواست",
  },
  barcode: {
    title: "بارکد",
  },

  activate: {
    title: "فعال سازی",
  },
  // start producer panel
  producer: {
    title: "پنل تولید کننده",
    href: "/producer",
  },
  "request-list": {
    title: "لیست درخواست ها",
  },
  request: {
    title: "ثبت درخواست",
  },
  "production-process": {
    title: "مرحله اول",
  },
  formulacion: {
    title: "مرحله دوم",
  },
  "final-product": {
    title: "مرحله سوم",
  },
  "final-preview": {
    title: "مرحله چهارم",
  },
  "base-info": {
    title: "اطلاعات اولیه",
  },
  "laboratory-equipments": {
    title: "تجهیزات آزمایشگاهی",
  },
  "creator-production": {
    title: "اطلاعات واحد تولیدی",
  },
  "management-info": {
    title: "اطلاعات مدیریتی",
  },
  "personnel-info": {
    title: "اطلاعات پرسنلی",
  },
  "license-info": {
    title: "اطلاعات مجوز",
  },
  "contact-info": {
    title: "اطلاعات تماس",
  },
  // end producer panel

  // start manufacturer panel
  manufacturer: {
    title: "پنل رئیس اجرایی",
    href: "/manufacturer",
  },
  "creator-list": {
    title: "لیست تولید کنندگان",
  },
  "lab-results-list": {
    title: "نتایج آزمایشگاه",
  },
  // end manufacturer panel

  // start state-general-management panel
  "state-general-management": {
    title: "سامانه کارشناس استان",
    href: "/state-general-management",
  },
  "delays-list": {
    title: "تاخیرها",
  },
  requestdetail: {
    title: "جزئیات درخواست",
  },
  // end state-general-management panel

  // start state-org-manager panel
  "state-org-manager": {
    title: "پنل کارشناس استان",
  },
  "producer-list": {
    title: "لیست تولید کنندگان",
  },
  "producer-details": {
    title: "جزئیات تولید کنندگان",
  },
  "experts-list": {
    title: "لیست کارشناسان",
  },
  "experts-details": {
    title: "جزئیات کارشناسان",
  },
  "expired-requests-list": {
    title: "درخواست های منقضی شده",
  },
  "expired-requests-details": {
    title: "جزئیات درخواست های منقضی شده",
  },
  "laboratory-results-list": {
    title: "نتایج آزمایشگاه",
  },
  "lab-results-details": {
    title: "جزئیات نتایج آزمایشگاه",
  },
  // end state-org-manager panel

  // start provincial-working-group panel
  "provincial-working-group": {
    title: "پنل کارگروه استان",
    href: "/provincial-working-group",
  },
  "request-details": {
    title: "جزئیات درخواست",
  },
  Invitations: {
    title: "دعوت نامه ها",
  },
  "visit-reports": {
    title: "گزارشات بازدید",
  },
  // start provincial-working-group panel

  // start laboratory panel
  laboratory: {
    title: "پنل آزمایشگاه",
    href: "/laboratory",
  },
  "accepted-requests": {
    title: "درخواست های پذیرفته شده",
  },
  list: {
    title: "لیست",
  },
  report: {
    title: "ارسال گزارش",
  },
  "gps-confirmations": {
    title: "تاییدیه های GPS",
  },
  // end laboratory panel

  // start admin panel
  "admin-panel": {
    title: "پنل ادمین",
    href: "/admin-panel",
  },
  product: {
    title: "محصول",
  },
  "row-material-product": {
    title: "مواد اولیه محصول",
  },
  "add-box": {
    title: "افزودن جعبه",
  },
  "adding-raw-material": {
    title: "مواد اولیه",
  },
  "category-list": {
    title: "لیست دسته بندی",
  },
  "confirm-changes": {
    title: "ثبت تغییرات",
  },
  "labratory-factor": {
    title: "فاکتور های آزمایشگاه",
  },
  "list-experts": {
    title: "لیست کارشناسان",
  },
  "management-user": {
    title: "مدیریت کاربران",
  },
  "management-user-role": {
    title: "نقش کاربران",
  },
  "products-factor": {
    title: "فاکتور های محصول",
  },
  "products-list": {
    title: "لیست محصولات",
  },
  province: {
    title: "استان",
  },
  "raw-product-factor": {
    title: "فاکتور ماده اولیه",
  },
  "test-factors": {
    title: "فاکتور های آمون",
  },
  "test-feature": {
    title: "استاندارد های آزمون",
  },
  "test-result": {
    title: "نتایج آزمون",
  },
  "test-result-record": {
    title: "ثبت نتایج آزمایشگاه",
  },
  "production-unit": {
    title: "تولید کننده",
  },
  "gps-devices": {
    title: "دستگاه های GPS",
  },
  "gps-tracking": {
    title: "رهگیری GPS",
  },
  measures: {
    title: "واحد اندازه گیری",
  },
  // end admin panel
};
