import { useRef, useState } from "react";
import { ListChecks, Plus } from "lucide-react";
import TodoItem from "./components/TodoItem.jsx";
import { FILTERS, ORDER, PRIORITIES } from "./constants";

const INITIAL = [
  { id: 1, text: "ส่งการบ้านวิชาคอมพิวเตอร์", done: false, priority: "high" },
  { id: 2, text: "ซื้อของเข้าบ้าน", done: false, priority: "medium" },
  { id: 3, text: "อ่านหนังสือ 30 นาที", done: true, priority: "low" },
];

export default function App() {
  const [todos, setTodos] = useState(INITIAL);
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState("medium");
  const [filter, setFilter] = useState("all");
  const [removing, setRemoving] = useState([]);
  const nextId = useRef(4);

  const add = () => {
    const t = input.trim();
    if (!t) return;
    setTodos((s) => [{ id: nextId.current++, text: t, done: false, priority }, ...s]);
    setInput("");
  };

  const remove = (id) => {
    setRemoving((r) => [...r, id]);
    setTimeout(() => {
      setTodos((s) => s.filter((t) => t.id !== id));
      setRemoving((r) => r.filter((x) => x !== id));
    }, 300);
  };

  const toggle = (id) => setTodos((s) => s.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  const edit = (id, text) => setTodos((s) => s.map((t) => (t.id === id ? { ...t, text } : t)));
  const cycle = (id) =>
    setTodos((s) =>
      s.map((t) =>
        t.id === id ? { ...t, priority: ORDER[(ORDER.indexOf(t.priority) + 1) % ORDER.length] } : t
      )
    );

  const clearDone = () => {
    const ids = todos.filter((t) => t.done).map((t) => t.id);
    if (!ids.length) return;
    setRemoving((r) => [...r, ...ids]);
    setTimeout(() => {
      setTodos((s) => s.filter((t) => !t.done));
      setRemoving([]);
    }, 300);
  };

  const remaining = todos.filter((t) => !t.done).length;
  const doneCount = todos.length - remaining;
  const shown = todos.filter((t) =>
    filter === "all" ? true : filter === "active" ? !t.done : t.done
  );

  return (
    <main className="mx-auto w-full max-w-xl px-4 py-8 sm:py-12">
      <header className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-500 text-white shadow-sm">
          <ListChecks size={22} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">รายการงานของฉัน</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">ดับเบิลคลิกที่งานเพื่อแก้ไข</p>
        </div>
      </header>

      <div className="mb-5 rounded-2xl bg-white dark:bg-zinc-800 p-3 shadow-sm shadow-black/5 ring-1 ring-black/5 dark:ring-white/10">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && add()}
            placeholder="เพิ่มงานใหม่..."
            className="min-w-0 flex-1 rounded-xl bg-zinc-50 dark:bg-zinc-900 px-4 py-2.5 text-base text-zinc-800 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-indigo-200"
          />
          <button
            onClick={add}
            className="flex shrink-0 items-center gap-1.5 rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-600 active:scale-95"
          >
            <Plus size={18} />
            <span className="hidden sm:inline">เพิ่ม</span>
          </button>
        </div>
        <div className="mt-3 flex items-center gap-2 px-1">
          <span className="text-sm text-zinc-500 dark:text-zinc-400">ความสำคัญ:</span>
          {ORDER.map((k) => (
            <button
              key={k}
              onClick={() => setPriority(k)}
              className={
                "flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition " +
                (priority === k
                  ? PRIORITIES[k].cls + " ring-2 ring-offset-1 ring-current dark:ring-offset-zinc-800"
                  : "bg-zinc-100 text-zinc-500 dark:bg-zinc-700 dark:text-zinc-300")
              }
            >
              <span className={"h-2 w-2 rounded-full " + PRIORITIES[k].dot} />
              {PRIORITIES[k].label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4 flex rounded-xl bg-zinc-200/70 dark:bg-zinc-800 p-1">
        {FILTERS.map(([k, label]) => (
          <button
            key={k}
            onClick={() => setFilter(k)}
            className={
              "flex-1 rounded-lg py-2 text-sm font-medium transition " +
              (filter === k
                ? "bg-white dark:bg-zinc-600 text-indigo-600 dark:text-white shadow-sm"
                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700")
            }
          >
            {label}
          </button>
        ))}
      </div>

      <ul className="m-0 min-h-[3rem] list-none p-0">
        {shown.map((t) => (
          <TodoItem
            key={t.id}
            todo={t}
            removing={removing.includes(t.id)}
            onToggle={toggle}
            onDelete={remove}
            onEdit={edit}
            onPriority={cycle}
          />
        ))}
        {shown.length === 0 && (
          <li className="rounded-2xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 py-10 text-center text-zinc-400">
            ไม่มีงานในรายการนี้
          </li>
        )}
      </ul>

      <footer className="mt-4 flex items-center justify-between px-1 text-sm text-zinc-500 dark:text-zinc-400">
        <span>
          เหลืออีก <b className="text-zinc-800 dark:text-zinc-100">{remaining}</b> งาน
        </span>
        <button
          onClick={clearDone}
          disabled={doneCount === 0}
          className={
            "rounded-lg px-3 py-1.5 font-medium transition " +
            (doneCount
              ? "text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30"
              : "opacity-40 cursor-not-allowed")
          }
        >
          ล้างที่เสร็จแล้ว{doneCount ? ` (${doneCount})` : ""}
        </button>
      </footer>
    </main>
  );
}
