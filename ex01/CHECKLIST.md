TripRecommendator (ex01) — Learning checklist

Start here and work step-by-step. Mark items done as you learn and complete them.

1) Project scaffold (you are here)
   - [ ] Understand Vite + React + TypeScript scaffold
   - [ ] Install deps: `npm install`
   - [ ] Run dev server: `npm run dev`

2) Dockerize
   - [ ] Build image and run with docker-compose
   - [ ] Ensure preview works at http://localhost:5173
   Dev inside Docker (recommended for consistent env)
   - Run: `docker compose up --build`
   - This runs `npm install` and `npm run dev` inside the container and mounts your project so edits on the host trigger HMR.
   - Note: the compose file keeps `/app/node_modules` inside the container to avoid conflicts with the host.

3) UI skeleton
   - [ ] Create mobile-first layout and free-text `<textarea>` input
   - [ ] Add submit button and basic form handling

4) Mock AI + Map integration
   - [ ] Create a mock API endpoint or local mocked responses
   - [ ] Integrate Leaflet or Mapbox and display mock markers

5) Replace mocks with real API integrations
   - [ ] Hook up OpenAI / geocoding (secure keys via env)
   - [ ] Show real suggestions on the map and interactive popups

6) Accessibility & polish
   - [ ] Add ARIA roles, keyboard navigation, and color contrast checks
   - [ ] Add tests and final README
