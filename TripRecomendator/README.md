TripRecommendator
=================================

This web application helps users find travel destinations from a short free-text description. The app uses an LLM to generate a short list of candidate places and  geocodes them to show markers on a map.

Tech stack
- Frontend: React + TypeScript (Vite)
- Styling: Tailwind CSS
- Map: Leaflet (react-leaflet)
- Dev / packaging: Docker + docker-compose

Quick status
- Current flow: client calls a HuggingFace/OpenAI-compatible router to generate up to 3 place suggestions. The app then attempts to geocode each suggestion and displays results + map markers.

How to run
-----------
We are focused in the development workflow during this project. Be AWARE that you will deploy as a development image, not a production one. ALSO, make sure to provide your API keys in a `.env` file as described below.

```bash
cd ex01
docker compose up --build
```

Then open: http://localhost:5173


# Environment / secrets

NOTE: We use huggingface as an example AI provider because OPENAI free-tier keys were not available at the time of writing for the developer.
---------------------
- Keep API keys out of the repo. Use `.env` 
- You have to obtain API keys from HuggingFACE: 
  1. Sign up / log in at https://huggingface.co/
  2. Go to your account settings -> Access Tokens
  3. Create a new token with "Read" permissions
  4. Copy the generated token

- create a ".env" file at the project root with your keys, e.g.:
  ```
 VITE_HF_API_KEY=your_ai_api_key_here
  
  ```
