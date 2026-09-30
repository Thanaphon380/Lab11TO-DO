// All dates are local "YYYY-MM-DD" strings, so string comparison works.
export const offsetDate = (n = 0) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toLocaleDateString("en-CA");
};

export const dueStatus = (todo) => {
  if (!todo.due) return null;
  if (todo.done) return "done";
  const today = offsetDate(0);
  if (todo.due < today) return "overdue";
  return todo.due === today ? "today" : "future";
};

export const fmtDate = (d) =>
  new Date(d + "T00:00:00").toLocaleDateString("th-TH", { day: "numeric", month: "short" });
