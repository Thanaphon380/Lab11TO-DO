export const PRIORITIES = {
  low: {
    label: "ต่ำ",
    cls: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    dot: "bg-emerald-500",
  },
  medium: {
    label: "กลาง",
    cls: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    dot: "bg-amber-500",
  },
  high: {
    label: "สูง",
    cls: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
    dot: "bg-red-500",
  },
};

export const ORDER = ["low", "medium", "high"];

export const FILTERS = [
  ["all", "ทั้งหมด"],
  ["active", "ยังไม่เสร็จ"],
  ["done", "เสร็จแล้ว"],
];
