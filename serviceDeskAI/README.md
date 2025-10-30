# Service Desk AI

This web application allows users to interact with a service desk AI assistant to get help with IT-related issues. The app uses a large language model (LLM) to understand user queries and provide relevant responses.





## Tech stack
- Frontend: React + TypeScript (Vite)
- Backend: Node.js + Express
- Dev / packaging: Docker + docker-compose  

## Development setup
1. Clone the repository.
2. Navigate to the project directory.
3. Run the following command to start the development environment:
    ```bash 
    docker compose -f docker-compose.dev.yml up --build
    ```
4. Access the frontend at `http://localhost:5173` and the backend at `http://localhost:5000`.
## Production setup
1. Ensure you have Docker and docker-compose installed.
2. Navigate to the project directory.
3. Run the following command to start the production environment:
    ```bash
    docker compose -f docker-compose.prod.yml up --build -d
    ```
4. Access the frontend at `http://localhost:80` and the backend at `http://localhost:5000`. 