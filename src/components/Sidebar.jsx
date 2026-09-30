import { Layers } from "lucide-react";
import { CATEGORIES, CAT_KEYS } from "../constants";

export default function Sidebar({ cat, onCat, counts, total }) {
  const items = [["all", "ทั้งหมด", total, null], ...CAT_KEYS.map((k) => [k, CATEGORIES[k].label, counts[k], CATEGORIES[k].dot])];
  return (
    <nav className="rounded-2xl bg-white dark:bg-zinc-800 p-2 shadow-sm shadow-black/5 ring-1 ring-black/5 dark:ring-white/10">
      <p className="hidden px-3 pb-1 pt-2 text-xs font-medium text-zinc-400 lg:block">หมวดหมู่</p>
      <div className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
        {items.map(([k, label, n, dot]) => (
          <button
            key={k}
            onClick={() => onCat(k)}
            className={
              "flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-sm transition " +
              (cat === k
                ? "bg-indigo-50 font-medium text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-200"
                : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-700")
            }
          >
            {dot ? <span className={"h-2.5 w-2.5 rounded-full " + dot} /> : <Layers size={14} />}
            <span className="flex-1 text-left">{label}</span>
            <span className="rounded-full bg-zinc-100 px-2 text-xs text-zinc-500 dark:bg-zinc-700 dark:text-zinc-300">{n}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
