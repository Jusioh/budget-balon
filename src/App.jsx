import { useState, useEffect } from "react";
import Header from "./components/Header";
import SummaryCards from "./components/SummaryCards";
import ExpenseForm from "./components/ExpenseForm";
import CategoryFilter from "./components/CategoryFilter";
import ExpenseList from "./components/ExpenseList";
import SearchModal from "./components/SearchModal";
import EditModal from "./components/EditModal";
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
  const [searching, setSearching] = useState(false); // search modal open?
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

  // Edit from the search results: close search, open edit modal
  const editFromSearch = (expense) => {
    setSearching(false);
    setEditing(expense);
  };

  return (
    <div>
      {phase !== "done" && <LoadingScreen leaving={phase === "leaving"} />}

      {/* Character art: bottom-right, behind the content, large screens only */}
      <img
        src={`${import.meta.env.BASE_URL}web_art.png`}
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
            <CategoryFilter
              value={filter}
              onChange={setFilter}
              onSearch={() => setSearching(true)}
            />
            <ExpenseList
              expenses={visible}
              onEdit={setEditing}
              onDelete={deleteExpense}
            />
          </section>
        </div>
      </main>

      {/* Search modal: search box on top, results below */}
      {searching && (
        <SearchModal
          expenses={expenses}
          onClose={() => setSearching(false)}
          onEdit={editFromSearch}
          onDelete={deleteExpense}
        />
      )}

      {/* Edit modal: same Persona 5 transition as search */}
      {editing && (
        <EditModal
          editing={editing}
          onSave={saveExpense}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  );
}
