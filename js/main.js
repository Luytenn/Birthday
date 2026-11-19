/* =================================================================
   A Magical Birthday Gift — interactions, motion & music
   ================================================================= */
(function () {
  "use strict";
  const CFG = window.CONFIG || {};
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduced = matchMedia("(prefers-reduced-motion:reduce)").matches;

  /* ---------- apply config -------------------------------------- */
  if (CFG.herName) document.title = "Happy Birthday, " + CFG.herName + " ♡";
  if (CFG.calendar) { const m = $("[data-month]"); if (m) m.textContent = CFG.calendar.month; }
  (function fillDates(){
    const d = CFG.dates || {};
    const nodes = $$("[data-date]");
    if (nodes[0] && d.birthday)  nodes[0].textContent = d.birthday;
    if (nodes[1] && d.firstTrip) nodes[1].textContent = d.firstTrip;
    if (nodes[2] && d.newYear)   nodes[2].textContent = d.newYear;
  })();

  /* ---------- build the calendar grid --------------------------- */
  (function buildCalendar(){
    const grid = $("#calGrid");
    if (!grid) return;
    const hl = (CFG.calendar && CFG.calendar.highlightDay) || Number(grid.dataset.highlight) || 0;
    ["sun","mon","tue","wed","thu","fri","sat"].forEach(d => {
      const el = document.createElement("span"); el.className = "dow"; el.textContent = d; grid.appendChild(el);
    });
    // start offset just for looks (first of month on a Thursday)
    for (let i = 0; i < 4; i++){ const e = document.createElement("span"); e.className="day"; grid.appendChild(e); }
    for (let n = 1; n <= 31; n++){
      const e = document.createElement("span");
      e.className = "day" + (n === hl ? " hl" : "");
      e.textContent = n;
      grid.appendChild(e);
    }
  })();

  /* ---------- scene navigation ---------------------------------- */
  const scenes = {};
  $$(".scene").forEach(s => scenes[s.dataset.scene] = s);
  let current = "envelope";

  function revealIn(scene){
    // trigger .reveal items in non-scrolling scenes
    $$(".reveal", scene).forEach((el, i) => {
      setTimeout(() => el.classList.add("in"), reduced ? 0 : 120 + i * 120);
    });
  }

  function go(name){
    if (!scenes[name] || name === current) return;
    const from = scenes[current], to = scenes[name];
    from.classList.remove("is-active");
    to.classList.add("is-active");
    to.scrollTop = 0;
    document.body.dataset.scene = name;
    current = name;
    revealIn(to);
    // music toggle appears once we're past the envelope
    musicToggle.classList.toggle("show", name !== "envelope");
  }

  $$("[data-go]").forEach(b => b.addEventListener("click", () => go(b.dataset.go)));

  /* ---------- envelope open ------------------------------------- */
  $("#openMe").addEventListener("click", () => {
    burstConfetti();
    setTimeout(() => go("menu"), 260);
  });

  /* ---------- gift open ----------------------------------------- */
  const parcel = $("#parcel");
  parcel.addEventListener("click", () => {
    if (parcel.classList.contains("is-opening")) return;
    parcel.classList.add("is-opening");
    burstConfetti();
    setTimeout(() => { go("opened"); parcel.classList.remove("is-opening"); }, 560);
  });

  /* ================================================================
     MUSIC  (shared <audio>, cassette + floating toggle)
     ================================================================ */
  const audio = $("#song");
  const musicToggle = $("#musicToggle");
  const cassette = $("#cassette");
  if (CFG.song && CFG.song.url) audio.src = CFG.song.url;
  if (CFG.song && CFG.song.title){ cassette.querySelector(".cassette__label").textContent = CFG.song.title; }

  let wantsPlay = false;
  function syncMusicUI(){
    const playing = !audio.paused && !audio.ended && audio.currentTime > 0;
    musicToggle.classList.toggle("is-playing", playing);
    cassette.classList.toggle("is-playing", playing);
    musicToggle.querySelector(".music-toggle__label").textContent = playing ? "playing" : "our song";
  }
  function toggleMusic(){
    if (!audio.src){ flashNoSong(); return; }
    if (audio.paused){
      audio.play().then(syncMusicUI).catch(flashNoSong);
    } else { audio.pause(); syncMusicUI(); }
  }
  function flashNoSong(){
    const lbl = musicToggle.querySelector(".music-toggle__label");
    lbl.textContent = "add song ♡";
    setTimeout(syncMusicUI, 1600);
  }
  cassette.addEventListener("click", () => { go("opened"); toggleMusic(); });
  musicToggle.addEventListener("click", toggleMusic);
  audio.addEventListener("play", syncMusicUI);
  audio.addEventListener("pause", syncMusicUI);
  audio.addEventListener("ended", syncMusicUI);

  /* ================================================================
     MOTION — floating hearts + confetti
     ================================================================ */
  const ambient = $("#ambient");
  function spawnHeart(){
    if (reduced) return;
    const fl = document.createElement("span");
    fl.className = "fl";
    const size = 10 + Math.random() * 18;
    fl.style.left = Math.random() * 100 + "vw";
    fl.style.width = size + "px";
    fl.style.height = size * 0.9 + "px";
    const dur = 7 + Math.random() * 7;
    fl.style.animation = `rise ${dur}s linear forwards`;
    fl.style.filter = `hue-rotate(${Math.random()*16-8}deg)`;
    ambient.appendChild(fl);
    setTimeout(() => fl.remove(), dur * 1000 + 200);
  }
  if (!reduced) setInterval(spawnHeart, 1300);

  function burstConfetti(){
    if (reduced) return;
    const colors = (CFG.confettiColors) || ["#b11f28","#e05761","#f0c766","#faf7f0"];
    const layer = document.createElement("div");
    layer.className = "confetti";
    document.body.appendChild(layer);
    for (let i = 0; i < 70; i++){
      const c = document.createElement("i");
      c.style.left = Math.random() * 100 + "vw";
      c.style.background = colors[i % colors.length];
      c.style.transform = `translateY(0) rotate(${Math.random()*360}deg)`;
      const dur = 1.6 + Math.random() * 1.6;
      c.style.animation = `drop ${dur}s ${Math.random()*0.3}s ease-in forwards`;
      if (Math.random() > .5) c.style.borderRadius = "50%";
      layer.appendChild(c);
    }
    setTimeout(() => layer.remove(), 3800);
  }

  /* ---------- scroll reveals inside Memories --------------------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.18 });
  $$(".scene--memories .reveal").forEach(el => io.observe(el));

  /* ---------- boot ---------------------------------------------- */
  revealIn(scenes.envelope);
})();
