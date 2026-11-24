export default function LoadingScreen({ leaving }) {
  return (
    <div
      role="status"
      aria-label="Loading BudgetBalon"
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-500 ${
        leaving ? "opacity-0" : "opacity-100"
      }`}
    >
      <img src="/loading.gif" alt="" className="max-h-full max-w-full object-contain" />
    </div>
  );
}