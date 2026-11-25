import { useState, useEffect, useRef, useCallback } from "react";

export default function SearchModal({ expenses, onClose, onEdit }) {
  const [query, setQuery] = useState("");
  const [closing, setClosing] = useState(false);
  const [settled, setSettled] = useState(false); // true once the open animation is done
  const inputRef = useRef(null);

  // Play the exit animation, then actually unmount
  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(onClose, 250);
  }, [onClose]);

  // Allow scrolling only after the open animation has finished
  useEffect(() => {
    const t = setTimeout(() => setSettled(true), 850);
    return () => clearTimeout(t);
  }, []);

  // Focus the input once the card has popped in
  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 450);
    return () => clearTimeout(t);
  }, []);

  // Close with Escape
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && handleClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleClose]);

  const q = query.trim().toLowerCase();

  const results = q
    ? expenses.filter(
        (e) =>
          e.description.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q) ||
          e.date.includes(q) ||
          String(e.amount).includes(q)
      )
    : [];

  return (
    <>
      {/* Red + black slash wipe (only on open) */}
      {!closing && <div className="p5-wipe" aria-hidden="true" />}

      <div
        className={`fixed inset-0 z-40 grid place-items-center bg-black/50 p-4 backdrop-blur-md ${
          settled && !closing ? "overflow-y-auto overflow-x-hidden" : "overflow-hidden"
        } ${closing ? "p5-leave" : "p5-overlay"}`}
        onClick={handleClose}
        role="dialog"
        aria-modal="true"
        aria-label="Search expenses"
      >
        {/* Character art: bottom-left, beside the modal, large screens only */}
        <img
          src={`${import.meta.env.BASE_URL}search_art.png`}
          alt=""
          aria-hidden="true"
          className="p5-art pointer-events-none fixed bottom-0 left-0 z-0 hidden h-[65vh] max-h-[560px] w-auto select-none xl:block"
        />

        <div
          className="p5-pop card relative z-10 grid w-full max-w-[560px] gap-4 p-6"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top: search box */}
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold text-brand">Search</h2>
            <button
              type="button"
              className="btn"
              onClick={handleClose}
              aria-label="Close search"
            >
              Close
            </button>
          </div>

          <div className="relative">
            <input
              ref={inputRef}
              type="search"
              className="field w-full pr-10 text-lg"
              placeholder="Search description, category, date, amount..."
              aria-label="Search expenses"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            {query && (
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 px-2 font-bold text-ink"
                onClick={() => {
                  setQuery("");
                  inputRef.current?.focus();
                }}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Bottom: results */}
          <div className="max-h-[50vh] overflow-y-auto">
            {!q ? (
              <p className="py-4 text-center text-muted">
                Type something to search your expenses.
              </p>
            ) : results.length === 0 ? (
              <p className="py-4 text-center text-muted">
                No matching expenses found.
              </p>
            ) : (
              <>
                <p className="mb-2 text-sm text-muted">
                  {results.length} result{results.length > 1 ? "s" : ""}
                </p>

                <ul className="grid gap-2">
                  {results.map((e) => (
                    <li
                      key={e.id}
                      className="flex items-center justify-between gap-3 border-2 border-line bg-white p-3"
                    >
                      <div className="min-w-0">
                        <strong className="block truncate">
                          {e.description}
                        </strong>
                        <small className="block text-muted">
                          {e.category}, {e.date}
                        </small>
                      </div>

                      <div className="flex shrink-0 items-center gap-3">
                        <span className="font-bold">
                          ₱{e.amount.toFixed(2)}
                        </span>
                        <button
                          type="button"
                          className="btn"
                          onClick={() => onEdit(e)}
                        >
                          Edit
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}