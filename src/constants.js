export const PRIORITIES = {
  low: { label: "ต่ำ", cls: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300", dot: "bg-emerald-500" },
  medium: { label: "กลาง", cls: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300", dot: "bg-sky-500" },
  high: { label: "สูง", cls: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300", dot: "bg-rose-500" },
};
export const ORDER = ["low", "medium", "high"];

export const CATEGORIES = {
  work: { label: "งาน", dot: "bg-indigo-500" },
  personal: { label: "ส่วนตัว", dot: "bg-violet-500" },
  shopping: { label: "ช้อปปิ้ง", dot: "bg-pink-500" },
  health: { label: "สุขภาพ", dot: "bg-teal-500" },
};
export const CAT_KEYS = Object.keys(CATEGORIES);

export const FILTERS = [
  ["all", "ทั้งหมด"],
  ["active", "ยังไม่เสร็จ"],
  ["done", "เสร็จแล้ว"],
];
