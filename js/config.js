/* =================================================================
   PERSONALIZE ME  ✦  Edit the values below, then save.
   ================================================================= */
window.CONFIG = {
  // Her name (shown in the browser tab title). Leave "" to keep default.
  herName: "",

  // The calendar scene: month label + the date to circle (1–31)
  calendar: { month: "November", highlightDay: 19 },

  // Dates you can swap in the Memories scene (plain text, any format)
  dates: {
    birthday: "08 / 10",
    firstTrip: "08 / 15",
    newYear: "16 / 08"
  },

  // OUR SONG
  // Easiest: drop an mp3 at assets/song.mp3 and leave this as is.
  // Or paste a direct audio URL. (Spotify/YouTube page links won't autoplay
  //  in a plain <audio> tag — use an .mp3 file for the cassette to work.)
  song: { url: "assets/song/colapso.mp3", title: "ruduni song" },

  // BACKGROUND SONG — plays softly from the first click, loops; the cassette stops it.
  bgSong: { url: "assets/song/mistky.mp3", volume: 0.55 },

  // Confetti colours when the envelope / gift opens
  confettiColors: ["#b11f28", "#e05761", "#f0c766", "#faf7f0", "#9c1a23"]
};
