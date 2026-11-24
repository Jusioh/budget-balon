import { useState, useEffect } from "react";

export const CATEGORIES = ["Food", "Transport", "School", "Load", "Other"];
const today = () => new Date().toISOString().slice(0, 10);
const empty = { description: "", amount: "", category: "Food", date: today() };

export default function ExpenseForm({ editing, onSave, onCancel }) {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm(editing ? { ...editing, amount: String(editing.amount) } : empty);
    setErrors({});
  }, [editing]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const errs = {};
    if (!form.description.trim()) errs.description = "Enter a description.";
    if (!(Number(form.amount) > 0)) errs.amount = "Enter an amount above 0.";
    if (!form.date) errs.date = "Pick a date.";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;
    onSave({
      ...form,
      description: form.description.trim(),
      amount: Number(form.amount),
    });
    setForm(empty);
  };

  const label = "grid gap-1 text-sm";
  const error = "text-xs text-danger";

  return (
    <form className="card grid gap-3" onSubmit={handleSubmit} noValidate>
      <h2 className="text-lg font-semibold text-brand">
        {editing ? "Edit expense" : "Add expense"}
      </h2>

      <label className={label}>
        Description
        <input className="field" name="description" value={form.description} onChange={handleChange} />
        {errors.description && <span className={error}>{errors.description}</span>}
      </label>

      <label className={label}>
        Amount (₱)
        <input className="field" name="amount" type="number" step="0.01" value={form.amount} onChange={handleChange} />
        {errors.amount && <span className={error}>{errors.amount}</span>}
      </label>

      <label className={label}>
        Category
        <select className="field" name="category" value={form.category} onChange={handleChange}>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
      </label>

      <label className={label}>
        Date
        <input className="field" name="date" type="date" value={form.date} onChange={handleChange} />
        {errors.date && <span className={error}>{errors.date}</span>}
      </label>

      <div className="flex flex-wrap gap-2">
        <button type="submit" className="btn border-brand bg-brand text-white">
          {editing ? "Save changes" : "Add expense"}
        </button>
        {editing && (
          <button type="button" className="btn" onClick={onCancel}>Cancel</button>
        )}
      </div>
    </form>
  );
}