# Finger Flick Soccer – Country Theme Test (v18)

This build adds a **Country** theme for testing.

## What changed
- Added **Country** as a theme option in **Settings**.
- Uses the uploaded forest / country field as the board image.
- Uses the uploaded top-down player sprites as team markers:
  - **Home team** = blue player sprite
  - **Away team** = yellow player sprite, rotated to face the opposite direction
- Country markers are drawn larger than the metal pins and scaled to the field.
- Included `manifest.webmanifest`, `service-worker.js`, and app icons so the project is closer to installable as a PWA when hosted over HTTPS.

## Notes
- Classic and City themes still use the normal metal pins.
- Country theme reuses the same gameplay logic and pin layout, but shows player-style markers.
- For Android install to homescreen, host the folder on HTTPS and open it in Chrome.


v19: Country theme player-pin placement adjusted for better spacing. All themes now use shallower, tighter goal cages aligned to the end line for a more realistic look.


v20: Goal cages refined to sit directly on the field end line, with shallower and more realistic top-down frames across all themes. Country theme player placement brought back in line with the shared formation.


v21: Goals moved visually tighter to the end line with a more realistic mini-goal frame and net. Added Rocket-League-style goal explosion effects when the ball scores.


V22 updates:
- Shared rectangular, shallower goals on all themes aligned directly on the field end lines.
- More realistic goal rendering with a net grid plus animated net shake/ripple on scores.
- Existing goal explosion effect retained and paired with the new goal animation.
- Country theme switched back to standard pins with shared placement.
- Country field mapping tightened so pin placement and ball boundary collisions track the visible field lines better.


V23 updates:
- Goal mouths moved into the side goal slot area (the rectangle lane between the field line and stadium wall) on both ends.
- Goal scoring now triggers when the whole ball crosses the new goal mouth position.
- Shared goal geometry remains applied to every theme.


V24 updates:
- Moved goal mouths closer to the field line on every theme.
- Increased shared goal depth/thickness for a fuller, more realistic look.
- Kept shared goal placement/scoring logic across all themes.


V25 updates:
- Goal mouth moved directly onto the field-of-play line on both ends for all themes.
- Goal scoring sensor now triggers reliably when the ball breaks the plane inside the goal slot.
- Added explicit own-goal support: if a player knocks the ball into their own net, the opponent scores.
- Kickoff still returns to the side that conceded.
