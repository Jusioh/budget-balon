import { useEffect, useRef, useState } from "react";

// Put your audio file in the /public folder and match the name here.
const SONG = `${import.meta.env.BASE_URL}beneath-the-mask.mp3`;

export default function MusicButton() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  // Set the volume only. No autoplay: music starts when the button is pressed.
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = 0.4;
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) audio.play().catch(() => {});
    else audio.pause();
  };

  return (
    <>
      <button
        type="button"
        data-music
        className="social-link"
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? "Pause music" : "Play music"}
        title={playing ? "Pause music" : "Play music"}
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
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
          {!playing && <path d="M3 3l18 18" />}
        </svg>
      </button>

      <audio
        ref={audioRef}
        src={SONG}
        loop
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
    </>
  );
}