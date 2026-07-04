# Finger Flick Soccer — v29 (Responsive + Home/Away rebuild)

Major rebuild on top of v28. All gameplay geometry now derives from a per-theme
calibrated field rectangle, teams are Home/Away, and the layout adapts to any
screen without cropping the court.

## V29 updates

### Responsive court layout
- The court image auto-fits the screen with **contain** logic (no cover-zoom, no cropping).
- The app measures the real UI (top buttons, scoreboard) and fits the board into the remaining safe viewport.
- The full playable field stays visible in phone portrait, phone landscape, tablet, and desktop.
- Portrait stacks the scoreboard above the court; landscape overlays it compactly without covering the field.

### Calibration system
- Each theme declares `fieldRect = {x, y, w, h}` normalized to its image.
- Ball boundaries, pin placement, goal placement, scoring sensors, kickoff center, and penalty spots all derive from that one rectangle.
- New **Debug overlay** setting draws the image bounds, field boundary, center line, goal mouths, scoring planes, penalty spots, pin collision circles, and the ball collision circle.

### Pins
- All themes use the same shared normalized formation (Country and City match Classic).
- Standard circular metal pins everywhere — no player sprites.
- Pins scale with the field and stay put across resizes; formation is mirrored Home → Away.

### Goals
- Shared goal logic on all themes; the mouth sits directly on the field end line.
- Shallow rectangular mini-goals: white metal frame, rear bar, net grid, shadow, and net ripple/shake on goals.
- Scoring is fully separate from frame collision: the end line is open inside the mouth (no invisible wall), posts are solid circles, the back net gives a soft bounce.
- A goal triggers when the ball breaks the goal plane inside the mouth.

### Own-goal fix
- Scoring is decided only by which goal the ball entered: left goal → Away scores, right goal → Home scores.
- "OWN GOAL" is only a label, shown when the shooting team put the ball in its own net.
- Practice mode shows "HOME GOAL / AWAY GOAL" and never "own goal."

### Home/Away naming
- Player 1 / Player 2 replaced with Home (blue) and Away (yellow/orange) across the scoreboard, turn indicator, logs, referee panel, win screen, and AI mode.

### Scoreboard + turn indicator
- Compact dark mini scoreboard: `HOME 0 – 0 AWAY`, score-limit tag, glow on the active team.
- "HOME TURN / AWAY TURN" pill, plus a pulsing ring around the ball in the active team color.
- AI mode shows "AWAY AI" and "AI AIMING…" while the computer prepares its shot.

### AI rebuild
- AI only shoots on Away's turn, waits after the ball stops, and never shoots while the ball moves or during goal cooldown.
- It aims at a point inside the Home (left) goal mouth from the ball's current position, scales power with distance, and adds difficulty-based error.
- Turn returns to Home after the AI shot stops; the AI can score and concede own goals correctly.

### Physics
- Fixed-timestep simulation (120 Hz) with speed-based substeps so fast shots cannot tunnel through pins, walls, or goals.
- Distinct restitution: walls (medium), pins (snappy), goal frame (solid), net (soft).
- Friction + rolling resistance, velocity-based ball spin, and a sleep threshold so the ball reliably stops.
- Collision sound and haptic feedback (both toggleable).

### Menus
- Home screen: Play Local, Play vs AI, Practice, Settings, Rules.
- Settings: Theme, Score limit, Control mode, AI difficulty, Sound, Vibration, Debug overlay, Reset saved settings. Settings persist in localStorage.
- In-game: compact Home / Pause / Rules / Ref / Reset buttons; Match Log lives in the pause menu.
- Referee panel: Home/Away labels, yellow/red cards, remove/restore pin, center free kick, penalty kick.

### PWA
- Service worker cache bumped to `finger-flick-soccer-v29-responsive-home-away` so Android Chrome picks up the new build.
- Installable when hosted over HTTPS (or localhost).

## Calibrating a new court image
1. Add the image to the `images` object in `index.html`.
2. Add a theme entry with the image's pixel size and a `fieldRect` normalized to the image (measure the playable area's pixels and divide by the image size).
3. Turn on **Settings → Debug overlay** and confirm the green field boundary, goal mouths, and pins line up with the artwork.

## V30 updates (landscape-only)

- Gameplay is landscape-only: portrait shows a full-screen "Rotate to landscape to play." overlay with an animated phone icon, and the simulation (physics, AI, input) pauses until the device rotates back. Menus remain usable in portrait.
- The board is only ever laid out for landscape, so the court always gets the largest contain-fit size the viewport allows; layout recalculates on every resize/orientation change.
- The ball position is preserved relative to the field across resizes and rotations (no drift).
- PWA manifest now sets `"orientation": "landscape"`.
- Turn label moved INTO the scoreboard (the floating PRACTICE/turn pill under it was removed): a "HOME TURN / AWAY TURN / AWAY AI / AI AIMING…" strip inside the board, colored by team.
- Active team side now pulses (blue for Home, orange for Away) with a blinking possession dot next to the team name; the inactive side dims. All of it is driven by game state and updates the moment the turn changes.
- Flashing stops automatically during goal celebrations, pauses, menus, portrait pause, and the game-over screen.
- Compact UI tweaks for short landscape phone screens (max-height 480px).
- Service worker cache bumped to `finger-flick-soccer-v30-landscape-only`.

## V31 updates (Finger Flicken Soccer branding + new classic board)

- Game renamed **Finger Flicken Soccer** everywhere: page title, PWA manifest (`name`/`short_name`), Apple web-app title.
- New classic theme: the Finger Flicken felt table board (1672x941 webp, embedded). Calibrated `fieldRect` = {x:148/1672, y:82/941, w:1373/1672, h:782/941} — the solid white touchlines, measured pixel-exact from the artwork. Goals sit on the end lines inside the metal-frame openings.
- Pins redrawn as tabletop pegs matching the reference photo: white ball head, thin angled silver stick, soft shadow. Sticks lean deterministically toward each team's own goal (no frame-to-frame or resize drift).
- New shared 9-pin formation measured from the reference photo via blob detection, mirrored Home→Away, used by all three themes.
- Main menu rebuilt for landscape: transparent-background logo beside the buttons, never scrollable. Settings (2-column grid) and Rules (2-column list) also fit a 640x360 landscape phone without scrolling.
- New app icon (192/512 PNG) generated from the provided icon art.
- Old player-sprite marker images removed from the bundle (index.html shrank from 16.2 MB to 10.9 MB).
- Service worker cache bumped to `finger-flicken-soccer-v31-branding`.

## V32 updates (always-widescreen + Binho pegs)

- **No device rotation needed**: the game always presents widescreen. On portrait viewports the whole UI stage is rotated 90 deg by CSS, sized in px from innerWidth/innerHeight (immune to mobile toolbar vh drift), with pointer input remapped into stage coordinates. Menus, HUD, and gameplay all live inside the rotated stage; container-query units (cqw/cqh) keep every screen fitting in both physical orientations, and safe-area insets are remapped to the correct physical edges.
- A size watchdog in the render loop re-runs layout if the viewport changes without a resize event.
- **Zoom-to-field**: every theme now scales so the playable field (not the whole image) fills the largest possible area, centered, with margin reserved for the goal boxes. City/Country get the same on-screen field size as Classic; decorative surroundings crop off-screen, the field never does.
- **Pins**: straight cylindrical Binho-style pegs seen top-down — glossy dark-red body, bright cap, specular highlight, drop shadow, thin outline. New vertically symmetric 10-peg formation per team measured from the reference photos, mirrored Home-Away, shared by all themes.
- Turn label is populated before layout measurement so it never overlaps the field; drags abort cleanly on layout changes; ref panel and menu cards gained scroll safety nets; toast raised above menu overlays.
- URL test hooks for automated checks: index.html#practice / #local / #ai, plus +debug and +classic/+city/+country.
- Service worker cache bumped to `finger-flicken-soccer-v32-auto-rotate`. Manifest keeps orientation "landscape" for installed PWAs.
