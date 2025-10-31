# Service Desk AI

This web application allows users to interact with a service desk AI assistant to get help with IT-related issues. The app uses a large language model (LLM) to understand user queries and provide relevant responses.

The project is still in its early stages, and there are many features and improvements planned for the future. You should test it in a development environment and not in production.

## Tech stack
- Frontend: React + TypeScript (Vite)
- Backend: Node.js + Express
- Dev / packaging: Docker + docker-compose  

## Setup
1. Make sure you have Docker, docker-compose, and Makefile installed on your machine.
2. Clone this repository.
3. Navigate to the project directory.
4. Run `make dev` to start the development environment.
5. Access the frontend at `http://localhost:5173` and the backend at `http://localhost:5000`.

## ENV Variables
create a `.env` file in the `backend` directory with the following variables(fill in the values as needed):
## Environment variables for backend


#-------------------------------------
# DATABASE
#----------------------------------
ADMIN_EMAIL=
ADMIN_USERNAME=
ADMIN_PASSWORD=
MONGO_URI=mongodb://database:27017/servicedeskai
#-------------------------------------


PORT=5000
JWT_SECRET=