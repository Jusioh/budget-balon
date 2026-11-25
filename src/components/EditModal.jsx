import { useState, useEffect, useCallback } from "react";
import ExpenseForm from "./ExpenseForm";

export default function EditModal({ editing, onSave, onClose }) {
  const [closing, setClosing] = useState(false);
  const [settled, setSettled] = useState(false); // true once the open animation is done

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

  // Close with Escape
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && handleClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleClose]);

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
        aria-label="Edit expense"
      >
        {/* Character art: bottom-left, beside the form, large screens only */}
        <img
          src={`${import.meta.env.BASE_URL}edit_art.png`}
          alt=""
          aria-hidden="true"
          className="p5-art pointer-events-none fixed bottom-0 left-0 z-0 hidden h-[65vh] max-h-[560px] w-auto select-none xl:block"
        />

        <div
          className="p5-pop relative z-10 w-full max-w-[560px] [&_form]:gap-5 [&_form]:p-6 [&_h2]:text-3xl [&_label]:text-lg [&_.field]:p-3 [&_.field]:text-lg [&_.btn]:px-6 [&_.btn]:py-2 [&_.btn]:text-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <ExpenseForm
            editing={editing}
            onSave={onSave}
            onCancel={handleClose}
          />
        </div>
      </div>
    </>
  );
}