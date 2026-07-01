# Finger Flick Soccer Rebuilt v13

This is a cleaner rebuilt version focused on playability.

## Highlights
- Stable home/settings/rules screens
- Finger flick touch controls by default
- Pull-back aim option
- Classic and City themes
- 10 pins per side, 20 pins total
- Goal cage rendering and scoring zones
- Referee panel for yellow/red cards and pin remove/add

## Run locally
```bash
cd finger_flick_soccer_pwa_rebuilt_v13
python3 -m http.server 8000
```

Open http://localhost:8000

PWA install/offline mode works from localhost or HTTPS.


v14: Classic board, City board, and ball images are embedded directly into index.html so previews cannot lose the images.


v15: updated City theme to the new uploaded image, reduced goal depth so the goal cages fit the field better, and tuned the city zoom/playfield to better match Classic.


v16: Goals are slightly more shallow, and Classic/City now share the exact same goal sizing and 10-pin layout constants.


v17: Fixed scoring after shallow goals by separating shallow visual goal depth from deeper hidden physics/scoring depth. The ball now scores when it fully crosses the goal line.
