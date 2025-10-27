COMPOSE = docker compose
BASE = -f docker-compose.yml
DEV = -f docker-compose.dev.yml
PROD = -f docker-compose.prod.yml

.PHONY: dev prod build-dev build-prod stop down logs ps clean

dev:
	$(COMPOSE) $(BASE) $(DEV) up --build

prod:
	$(COMPOSE) $(BASE) $(PROD) up --build -d

stop:
	$(COMPOSE) $(BASE) $(DEV) stop

down:
	$(COMPOSE) $(BASE) $(DEV) down

logs:
	$(COMPOSE) $(BASE) $(DEV) logs -f

ps:
	$(COMPOSE) $(BASE) $(DEV) ps

clean:
	$(COMPOSE) $(BASE) $(DEV) down -v --rmi all --remove-orphans
