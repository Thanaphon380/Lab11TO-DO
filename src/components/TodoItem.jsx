import { useEffect, useRef, useState } from "react";
import { Check, Trash2 } from "lucide-react";
import { PRIORITIES } from "../constants";

export default function TodoItem({ todo, removing, onToggle, onDelete, onEdit, onPriority }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(todo.text);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  const save = () => {
    const t = text.trim();
    if (t) onEdit(todo.id, t);
    else setText(todo.text);
    setEditing(false);
  };

  const p = PRIORITIES[todo.priority];

  return (
    <li
      className={
        "overflow-hidden transition-all duration-300 ease-out " +
        (removing
          ? "max-h-0 opacity-0 -translate-x-6 mb-0"
          : "max-h-32 opacity-100 translate-x-0 mb-3")
      }
    >
      <div className="flex items-center gap-3 rounded-2xl bg-white dark:bg-zinc-800 shadow-sm shadow-black/5 ring-1 ring-black/5 dark:ring-white/10 px-4 py-3">
        <button
          onClick={() => onToggle(todo.id)}
          aria-label="เสร็จแล้ว"
          className={
            "flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition " +
            (todo.done
              ? "bg-indigo-500 border-indigo-500 text-white"
              : "border-zinc-300 dark:border-zinc-500 hover:border-indigo-400")
          }
        >
          {todo.done && <Check size={14} />}
        </button>

        <div className="min-w-0 flex-1">
          {editing ? (
            <input
              ref={inputRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onBlur={save}
              onKeyDown={(e) => {
                if (e.key === "Enter") save();
                if (e.key === "Escape") {
                  setText(todo.text);
                  setEditing(false);
                }
              }}
              className="w-full rounded-md border border-indigo-300 bg-transparent px-2 py-1 text-base outline-none focus:ring-2 focus:ring-indigo-200 dark:text-zinc-100"
            />
          ) : (
            <span
              onDoubleClick={() => setEditing(true)}
              title="ดับเบิลคลิกเพื่อแก้ไข"
              className={
                "block break-words text-base select-none cursor-text " +
                (todo.done
                  ? "line-through text-zinc-400 dark:text-zinc-500"
                  : "text-zinc-800 dark:text-zinc-100")
              }
            >
              {todo.text}
            </span>
          )}
        </div>

        <button
          onClick={() => onPriority(todo.id)}
          title="เปลี่ยนความสำคัญ"
          className={"shrink-0 rounded-full px-2.5 py-1 text-xs font-medium transition hover:opacity-80 " + p.cls}
        >
          {p.label}
        </button>

        <button
          onClick={() => onDelete(todo.id)}
          aria-label="ลบ"
          className="shrink-0 rounded-lg p-2 text-zinc-400 transition hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/30"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </li>
  );
}
