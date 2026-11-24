
import MusicButton from "./MusicButton";

export default function Header() {
  return (
    <header className="relative z-10 pb-2 pt-8">
      <div className="mx-auto max-w-[960px] px-4 xl:ml-[5vw]">
        <div className="p5-wrap">
          <div className="p5-title">
            <h1>BudgetBalon</h1>
          </div>
        </div>

        <p className="p5-sub">
          Track your baon, see what’s left.
        </p>
      </div>

      <nav className="social-links" aria-label="Social links">
        <a
          href="https://github.com/Jusioh"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit my GitHub (Jusioh)"
          title="Jusioh on GitHub"
          className="social-link"
        >
          <svg
            viewBox="0 0 16 16"
            width="28"
            height="28"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
          </svg>
        </a>

        <a
          href="https://www.instagram.com/_jusioh/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit my Instagram (@_jusioh)"
          title="@_jusioh on Instagram"
          className="social-link"
        >
          <svg
            viewBox="0 0 24 24"
            width="28"
            height="28"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle
              cx="17.5"
              cy="6.5"
              r="1"
              fill="currentColor"
              stroke="none"
            />
          </svg>
        </a>

        <MusicButton />
      </nav>
    </header>
  );
}
