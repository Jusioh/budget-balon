
const peso = (n) => `₱${n.toFixed(2)}`;

export default function SummaryCards({
  budget,
  spent,
  onBudgetChange
}) {
  const remaining = budget - spent;
  const over = remaining < 0;

  return (
    <div className="summary-grid my-6 grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-4">

      <div className="card">
        <h3 className="mb-2 text-xl text-brand">
          Weekly budget
        </h3>

        <input
          type="number"
          min="0"
          value={budget}
          onChange={(e) =>
            onBudgetChange(Number(e.target.value) || 0)
          }
          aria-label="Weekly budget"
          className="field w-full text-2xl"
        />
      </div>

      <div className="card">
        <h3 className="mb-2 text-xl text-brand">
          Spent
        </h3>

        <p className="text-4xl font-bold">
          {peso(spent)}
        </p>
      </div>

      <div className={`card ${over ? "over" : ""}`}>
        <h3 className={`mb-2 text-xl ${over ? "" : "text-brand"}`}>
          {over ? "Over budget!" : "Remaining budget"}
        </h3>

        <p className="text-4xl font-bold">
          {peso(remaining)}
        </p>
      </div>

    </div>
  );
}
