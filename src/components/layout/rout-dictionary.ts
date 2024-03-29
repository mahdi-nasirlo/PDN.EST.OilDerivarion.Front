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

  activate: {
    title: "ثبت اطلاعات پایه",
  },
  // start producer panel
  producer: {
    title: "خانه",
    href: "/producer",
  },
  "submit-applicant": {
    title: "ثبت نام اولیه متقاضی",
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
    title: "اطلاعات پایه",
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
  "workflow-cartable": {
    title: "کارتابل",
  },
  "container-product": {
    title: "اطلاعات مخازن محصول",
  },
  "container-info": {
    title: "اطلاعات مخازن مواد اولیه",
  },
  "ractore-info": {
    title: "مشخصات راکتور",
  },
  "slice-produce": {
    title: "خط تولید برش گیری",
  },
  "distillation-tower": {
    title: "مشخصات برج تقطیر",
  },
  sweetening: {
    title: "روش شیرین سازی",
  },
  "ractore-prompter": {
    title: "تجهیزات شیرین سازی",
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
  "main-info-producer": {
    title: "اطلاعات اصلی تولید کننده",
  },
  // end manufacturer panel

  // start state-general-management panel
  "state-general-management": {
    title: "پنل مدیر کل استان",
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
    title: "لیست تولیدکننده ها",
  },
  "producer-details": {
    title: "جزئیات تولیدکنندگان",
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
  "laboratory-panel": {
    title: "پنل آزمایشگاه",
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

  "test-result-lab": {
    title: "لیست آزمایش ها",
  },
  "submit-test-result": {
    title: "ثبت نتیجه",
  },
  // end laboratory panel

  // start admin panel
  "admin-panel": {
    title: "پنل ادمین",
    href: "/admin-panel",
  },
  product: {
    title: "محصولات",
  },
  "row-material-product": {
    title: "مواد اولیه محصولات",
  },
  "add-box": {
    title: "افزودن جعبه",
  },
  material: {
    title: "مواد اولیه ها",
  },
  // "adding-raw-material": {
  //   title: "لیست مواد اولیه",
  // },
  // "raw-product-factor": {
  //   title: "فاکتور های آزمون مواد اولیه",
  // },
  "category-list": {
    title: "دسته بندی محصولات",
  },
  "management-users": {
    title: "مدیریت کاربران",
  },
  "confirm-changes": {
    title: "ثبت تغییرات",
  },
  laboratory: {
    title: " آزمایشگاه ها",
    href: "/laboratory",
  },
  "labratory-factor": {
    title: "فاکتور های آزمون آزمایشگاه",
  },
  "list-experts": {
    title: "لیست کارشناسان",
  },
  "management-user": {
    title: "لیست کاربران",
  },
  "management-user-role": {
    title: "نقش کاربران",
  },
  "products-factor": {
    title: "فاکتور های آزمون محصولات",
  },
  "products-list": {
    title: "لیست محصولات",
  },
  province: {
    title: "استان",
  },
  "test-factors": {
    title: "فاکتورهای آزمون",
  },
  "test-feature": {
    title: "استانداردهای آزمون",
  },
  "test-result": {
    title: "لیست نتایج آزمون ها",
  },
  "test-result-record": {
    title: "ثبت نتایج آزمایشگاه",
  },
  "production-unit": {
    title: "تولیدکننده",
  },
  GPS: {
    title: "لیست GPS ها",
  },
  "gps-devices": {
    title: "دستگاه های GPS",
  },
  "gps-tracking": {
    title: "رهگیری GPS",
  },
  "map-gps": {
    title: "موقعیت جغرافیایی آزمایشگاه ها",
  },
  "location-gps-device": {
    title: "موقعیت GPS",
  },
  measures: {
    title: "واحدهای اندازه گیری",
  },
  "producer-info": {
    title: "اطلاعات تولیدکننده",
  },
  barcode: {
    title: "لیست بارکدها",
  },

  // end admin panel

  task: {
    title: "وظایف",
  },
  detail: {
    title: "جزئیات",
  },
  "expert-naft": {
    title: "کارشناس نفت",
  },
  "expert-samt": {
    title: "کارشناس نفت",
  },
};
