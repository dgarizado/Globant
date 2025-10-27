HERE i will briefly describe the steps i have done to develop the project.

ServiceDeskAI (ex00)
=================================

# File directory structure
- Created a main project folder `serviceDeskAI/`.
- Inside it, created two subfolders: `frontend/` and `backend/` for respective codebases.

# Containerization setup
- Created a `docker-compose.dev.yml` file to define the development environment with two services:
  - `frontend`: React app using Vite, exposing port 5173.
  - `backend`: Node.js Express server, exposing port 5000.  
- Configured Dockerfiles for both services to set up the necessary dependencies and development tools.
- Created a  docker-compose.prod.yml for production deployment. this file uses multi-stage builds to optimize image size.
- Created a docker-compose.yml as base for both dev and prod files.

# Backend development
- npm init to create package.json.
- Installed express and cors packages for server functionality and handling cross-origin requests.
- Set up a basic Express server in `src/app.js` with a root endpoint returning a JSON message.
- Configured the server to listen on port 5000 in `src/server.js`.
- Installed mongoose and dotenv for future database integration and environment variable management.