# A Magical Birthday Gift 🎁

An interactive, romantic birthday website — an original build that re-creates the
"red scrapbook digital gift" flow: **envelope → pick a surprise → message →
memories → wrapped gift → opened box (with a cassette that plays your song).**

Everything is hand-built with HTML + CSS + vanilla JS. No frameworks, no build
step. Just double-click `index.html`.

## Run it
Open `index.html` in any modern browser (Chrome/Edge/Firefox). Works offline
except the Google Fonts, which load when you're online (there's a cursive
fallback otherwise).

## Make it yours (2 steps)

### 1. Add photos
Drop images into the `assets/` folder using these exact names:

| File              | Where it shows                                   |
|-------------------|--------------------------------------------------|
| `her.png`         | Envelope cut-out (a PNG with transparent bg = best) |
| `message.jpg`     | Polaroid on the Message page                     |
| `mem1.jpg`        | "Our first date" (inside the camera)             |
| `mem2.jpg`        | "Your birthday" (film frame)                     |
| `trip1/2/3.jpg`   | "Our first trip" (three polaroids)               |
| `mem4.jpg`        | "New year's" polaroid                            |
| `strip1..4.jpg`   | Film strip on the wrapped gift                   |
| `opened.jpg`      | Polaroid inside the opened box                   |

Any missing photo shows a tidy "photo" placeholder — nothing breaks.

### 2. Add your song + names
Open `js/config.js` and edit:
- `herName` — personalises the browser tab.
- `calendar.highlightDay` — the date circled on the calendar.
- `dates` — the dates in the Memories timeline.
- `song.url` — **drop an `.mp3` at `assets/song.mp3`** (easiest) or paste a direct
  audio URL. Click the cassette (or the top-right disc) to play.
  > Spotify/YouTube *page* links can't play inside a plain audio tag — use an mp3.

The love-letter copy lives directly in `index.html` — search for the text and
rewrite it in your own words.

## File map
```
work/
├─ index.html        # the 6 scenes
├─ css/styles.css    # design system + all the CSS art
├─ js/config.js      # ← personalize here
├─ js/main.js        # navigation, motion, music
└─ assets/           # your photos + song.mp3
```

## Notes
- All the decorative art (balloons, stars, camera, cassette, teddy, bouquet,
  gingham, film strips) is drawn in CSS — nothing copied from the original Canva
  template, so it's yours to tweak freely.
- The three menu stickers (cake / love-letter / teddy + bunny) live in
  `assets/stickers/`. Swap any `.svg` there to re-skin them — the cake also
  appears on the Message, Memories and Gift pages automatically.
- Reduced-motion is respected for anyone who prefers less animation.

## Credits
- Menu sticker graphics are from **Twemoji** by Twitter/jdecked, licensed
  **CC-BY 4.0** (https://github.com/jdecked/twemoji). Keep this credit if you
  publish the site. Replace them with your own art anytime and this no longer
  applies.

Made with love. 🤍
