export default function Stats({ total, done, active, overdue }) {
  const pct = total ? Math.round((done / total) * 100) : 0;
  const segs = [
    ["เสร็จแล้ว", done, "stroke-emerald-500", "bg-emerald-500"],
    ["กำลังทำ", active, "stroke-indigo-500", "bg-indigo-500"],
    ["เกินกำหนด", overdue, "stroke-red-500", "bg-red-500"],
  ];
  let acc = 0;
  return (
    <section className="rounded-2xl bg-white dark:bg-zinc-800 p-4 shadow-sm shadow-black/5 ring-1 ring-black/5 dark:ring-white/10">
      <p className="mb-3 text-xs font-medium text-zinc-400">สถิติ</p>
      <div className="flex items-center gap-4">
        <div className="relative h-24 w-24 shrink-0">
          <svg viewBox="0 0 36 36" className="h-full w-full">
            <circle cx="18" cy="18" r="15.9155" className="fill-none stroke-zinc-200 dark:stroke-zinc-700" strokeWidth="4" />
            {total > 0 &&
              segs.map(([label, v, stroke]) => {
                const len = (v / total) * 100;
                const el = len > 0 && (
                  <circle key={label} cx="18" cy="18" r="15.9155" className={"fill-none " + stroke} strokeWidth="4"
                    strokeDasharray={`${len} ${100 - len}`} strokeDashoffset={25 - acc} />
                );
                acc += len;
                return el;
              })}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-lg font-bold text-zinc-800 dark:text-zinc-100">{pct}%</span>
          </div>
        </div>
        <div className="min-w-0 flex-1 text-sm">
          <p className="mb-1 text-zinc-500 dark:text-zinc-400">
            ทั้งหมด <b className="text-zinc-800 dark:text-zinc-100">{total}</b> งาน
          </p>
          {segs.map(([label, v, , bg]) => (
            <p key={label} className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
              <span className={"h-2 w-2 rounded-full " + bg} />
              <span className="flex-1">{label}</span>
              <b className="text-zinc-700 dark:text-zinc-200">{v}</b>
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
