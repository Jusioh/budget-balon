import { useState, useEffect } from "react";
import Header from "./components/Header";
import SummaryCards from "./components/SummaryCards";
import ExpenseForm from "./components/ExpenseForm";
import CategoryFilter from "./components/CategoryFilter";
import ExpenseList from "./components/ExpenseList";
import "./App.css";
import LoadingScreen from "./components/LoadingScreen";

// Read from localStorage safely (falls back if empty or corrupted)
const load = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

export default function App() {
  const [expenses, setExpenses] = useState(() => load("bb_expenses", []));
  const [budget, setBudget] = useState(() => load("bb_budget", 500));
  const [filter, setFilter] = useState("All");
  const [editing, setEditing] = useState(null); // expense being edited, or null
  const [phase, setPhase] = useState("loading"); // loading → leaving → done

  useEffect(() => {
    const fade = setTimeout(() => setPhase("leaving"), 2500);
    const done = setTimeout(() => setPhase("done"), 3000);
    return () => {
      clearTimeout(fade);
      clearTimeout(done);
    };
  }, []);

  // Close the edit modal with Escape
  useEffect(() => {
    if (!editing) return;
    const onKey = (e) => e.key === "Escape" && setEditing(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [editing]);

  // Sync to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem("bb_expenses", JSON.stringify(expenses));
  }, [expenses]);
  useEffect(() => {
    localStorage.setItem("bb_budget", JSON.stringify(budget));
  }, [budget]);

  // Derived values: no extra state needed
  const visible =
    filter === "All" ? expenses : expenses.filter((e) => e.category === filter);
  const spent = expenses.reduce((sum, e) => sum + e.amount, 0);

  // CREATE or UPDATE (same form)
  const saveExpense = (data) => {
    if (data.id) {
      setExpenses((prev) => prev.map((e) => (e.id === data.id ? data : e)));
    } else {
      setExpenses((prev) => [{ ...data, id: crypto.randomUUID() }, ...prev]);
    }
    setEditing(null);
  };

  // DELETE with confirmation
  const deleteExpense = (id) => {
    if (!window.confirm("Delete this expense?")) return;
    setExpenses((prev) => prev.filter((e) => e.id !== id));
    if (editing?.id === id) setEditing(null);
  };

  return (
    <div>
      {phase !== "done" && <LoadingScreen leaving={phase === "leaving"} />}

      {/* Character art: bottom-right, behind the content, large screens only */}
      <img
        src="/web_art.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none fixed bottom-0 right-0 z-0 hidden h-[85vh] w-auto select-none xl:block"
      />

      <Header />
      <main className="relative z-10 mx-auto max-w-[960px] px-4 pb-10 xl:ml-[5vw]">
        <SummaryCards budget={budget} spent={spent} onBudgetChange={setBudget} />
        <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-[300px_1fr]">
          {/* Add form: always stays in the layout */}
          <ExpenseForm
            editing={null}
            onSave={saveExpense}
            onCancel={() => setEditing(null)}
          />
          <section>
            <CategoryFilter value={filter} onChange={setFilter} />
            <ExpenseList
              expenses={visible}
              onEdit={setEditing}
              onDelete={deleteExpense}
            />
          </section>
        </div>
      </main>

      {/* Edit modal: blurs everything behind it, form sits in front */}
      {editing && (
        <div
          className="fixed inset-0 z-40 grid place-items-center overflow-y-auto bg-black/50 p-4 backdrop-blur-md"
          onClick={() => setEditing(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Edit expense"
        >
          <div
        className="w-full max-w-[560px] [&_form]:gap-5 [&_form]:p-6 [&_h2]:text-3xl [&_label]:text-lg [&_.field]:p-3 [&_.field]:text-lg [&_.btn]:px-6 [&_.btn]:py-2 [&_.btn]:text-lg"
        onClick={(e) => e.stopPropagation()}
        >
            <ExpenseForm
              editing={editing}
              onSave={saveExpense}
              onCancel={() => setEditing(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}