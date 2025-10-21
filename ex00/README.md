# 2048 — ex00

Very small vanilla JS implementation of the 2048 game (HTML, CSS, JavaScript).

What it is
- A 4×4 grid game where tiles with values (powers of two) combine when moved.
- Starts with two tiles (2 or 4). New tiles spawn after each successful move.

How to run
- Open `index.html` in your browser (double-click or `xdg-open index.html`).
- Or run a simple server from the project folder and open http://localhost:8000:

```bash
cd /home/dgarizad/Desktop/globant/ex00
python3 -m http.server 8000
```

Controls
- Arrow keys: move tiles (Up / Down / Left / Right).
- Restart button: reset the game.

Rules (short)
- Tiles slide in the chosen direction and merge when two equal tiles collide.
- Each merge adds the merged value to your score.
- Win when a tile reaches 2048. Game over when no moves are possible.

Notes
- Pure client-side: no install required.
- See `script.js` for the game logic and `styles.css` for styling.

2048 GAME