import { useRef, useState } from "react";
import { CalendarDays, ListChecks, Plus, Search } from "lucide-react";
import TodoItem from "./components/TodoItem.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Stats from "./components/Stats.jsx";
import { CATEGORIES, CAT_KEYS, FILTERS, ORDER, PRIORITIES } from "./constants";
import { dueStatus, offsetDate } from "./utils";

const INITIAL = [
  { id: 1, text: "ส่งการบ้านวิชาคอมพิวเตอร์", done: false, priority: "high", category: "work", due: offsetDate(-2) },
  { id: 2, text: "ซื้อของเข้าบ้าน", done: false, priority: "medium", category: "shopping", due: offsetDate(0) },
  { id: 3, text: "วิ่งออกกำลังกาย 30 นาที", done: false, priority: "low", category: "health", due: offsetDate(3) },
  { id: 4, text: "อ่านหนังสือ", done: true, priority: "low", category: "personal", due: "" },
];
const next = (list, v) => list[(list.indexOf(v) + 1) % list.length];

export default function App() {
  const [todos, setTodos] = useState(INITIAL);
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState("medium");
  const [category, setCategory] = useState("personal");
  const [due, setDue] = useState("");
  const [filter, setFilter] = useState("all");
  const [cat, setCat] = useState("all");
  const [query, setQuery] = useState("");
  const [removing, setRemoving] = useState([]);
  const nextId = useRef(5);

  const patch = (id, fn) => setTodos((s) => s.map((t) => (t.id === id ? { ...t, ...fn(t) } : t)));

  const add = () => {
    const t = input.trim();
    if (!t) return;
    setTodos((s) => [{ id: nextId.current++, text: t, done: false, priority, category, due }, ...s]);
    setInput("");
    setDue("");
  };
  const remove = (id) => {
    setRemoving((r) => [...r, id]);
    setTimeout(() => {
      setTodos((s) => s.filter((t) => t.id !== id));
      setRemoving((r) => r.filter((x) => x !== id));
    }, 300);
  };
  const clearDone = () => {
    const ids = todos.filter((t) => t.done).map((t) => t.id);
    if (!ids.length) return;
    setRemoving((r) => [...r, ...ids]);
    setTimeout(() => {
      setTodos((s) => s.filter((t) => !t.done));
      setRemoving([]);
    }, 300);
  };

  const done = todos.filter((t) => t.done).length;
  const overdue = todos.filter((t) => dueStatus(t) === "overdue").length;
  const remaining = todos.length - done;
  const counts = Object.fromEntries(CAT_KEYS.map((k) => [k, todos.filter((t) => t.category === k).length]));
  const q = query.trim().toLowerCase();
  const shown = todos.filter(
    (t) =>
      (filter === "all" || (filter === "active" ? !t.done : t.done)) &&
      (cat === "all" || t.category === cat) &&
      (!q || t.text.toLowerCase().includes(q))
  );

  const card = "rounded-2xl bg-white dark:bg-zinc-800 shadow-sm shadow-black/5 ring-1 ring-black/5 dark:ring-white/10";
  const chip = "rounded-lg bg-zinc-50 px-2.5 py-1.5 text-xs text-zinc-600 outline-none dark:bg-zinc-900 dark:text-zinc-300";

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-8 sm:py-12">
      <header className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-500 text-white shadow-sm">
          <ListChecks size={22} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">รายการงานของฉัน</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">ดับเบิลคลิกที่งานเพื่อแก้ไข</p>
        </div>
      </header>

      <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
        <aside className="flex flex-col gap-4 lg:w-60 lg:shrink-0">
          <Sidebar cat={cat} onCat={setCat} counts={counts} total={todos.length} />
          <Stats total={todos.length} done={done} active={remaining - overdue} overdue={overdue} />
        </aside>

        <section className="min-w-0 flex-1">
          <div className={card + " mb-4 p-3"}>
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && add()}
                placeholder="เพิ่มงานใหม่..."
                className="min-w-0 flex-1 rounded-xl bg-zinc-50 dark:bg-zinc-900 px-4 py-2.5 text-base text-zinc-800 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-indigo-200"
              />
              <button onClick={add}
                className="flex shrink-0 items-center gap-1.5 rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-600 active:scale-95">
                <Plus size={18} />
                <span className="hidden sm:inline">เพิ่ม</span>
              </button>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2 px-1">
              {ORDER.map((k) => (
                <button key={k} onClick={() => setPriority(k)}
                  className={"flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition " +
                    (priority === k ? PRIORITIES[k].cls + " ring-2 ring-offset-1 ring-current dark:ring-offset-zinc-800" : "bg-zinc-100 text-zinc-500 dark:bg-zinc-700 dark:text-zinc-300")}>
                  <span className={"h-2 w-2 rounded-full " + PRIORITIES[k].dot} />
                  {PRIORITIES[k].label}
                </button>
              ))}
              <select value={category} onChange={(e) => setCategory(e.target.value)} className={chip} aria-label="หมวดหมู่">
                {CAT_KEYS.map((k) => <option key={k} value={k}>{CATEGORIES[k].label}</option>)}
              </select>
              <label className={chip + " flex items-center gap-1.5"}>
                <CalendarDays size={14} />
                <input type="date" value={due} onChange={(e) => setDue(e.target.value)} className="bg-transparent outline-none" aria-label="วันที่กำหนดส่ง" />
              </label>
            </div>
          </div>

          <div className={card + " mb-4 flex items-center gap-2 px-4 py-2.5"}>
            <Search size={16} className="text-zinc-400" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="ค้นหางาน..."
              className="w-full bg-transparent text-base text-zinc-800 outline-none dark:text-zinc-100" />
          </div>

          <div className="mb-4 flex rounded-xl bg-zinc-200/70 dark:bg-zinc-800 p-1">
            {FILTERS.map(([k, label]) => (
              <button key={k} onClick={() => setFilter(k)}
                className={"flex-1 rounded-lg py-2 text-sm font-medium transition " +
                  (filter === k ? "bg-white dark:bg-zinc-600 text-indigo-600 dark:text-white shadow-sm" : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700")}>
                {label}
              </button>
            ))}
          </div>

          <ul className="m-0 min-h-[3rem] list-none p-0">
            {shown.map((t) => (
              <TodoItem key={t.id} todo={t} removing={removing.includes(t.id)}
                onToggle={(id) => patch(id, (x) => ({ done: !x.done }))}
                onDelete={remove}
                onEdit={(id, text) => patch(id, () => ({ text }))}
                onPriority={(id) => patch(id, (x) => ({ priority: next(ORDER, x.priority) }))}
                onCategory={(id) => patch(id, (x) => ({ category: next(CAT_KEYS, x.category) }))}
                onDue={(id, d) => patch(id, () => ({ due: d }))}
              />
            ))}
            {shown.length === 0 && (
              <li className="rounded-2xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 py-10 text-center text-zinc-400">
                {q ? "ไม่พบงานที่ค้นหา" : "ไม่มีงานในรายการนี้"}
              </li>
            )}
          </ul>

          <footer className="mt-4 flex items-center justify-between px-1 text-sm text-zinc-500 dark:text-zinc-400">
            <span>เหลืออีก <b className="text-zinc-800 dark:text-zinc-100">{remaining}</b> งาน</span>
            <button onClick={clearDone} disabled={done === 0}
              className={"rounded-lg px-3 py-1.5 font-medium transition " + (done ? "text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30" : "opacity-40 cursor-not-allowed")}>
              ล้างที่เสร็จแล้ว{done ? ` (${done})` : ""}
            </button>
          </footer>
        </section>
      </div>
    </main>
  );
}
