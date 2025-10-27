# -----------------------------
# BASE IMAGE
# -----------------------------
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./

# -----------------------------
# DEVELOPMENT STAGE
# -----------------------------
FROM base AS development
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "run", "dev"]

# -----------------------------
# PRODUCTION STAGE
# -----------------------------
FROM base AS production
RUN npm install --omit=dev
COPY . .
EXPOSE 5000
ENV NODE_ENV=production
CMD ["npm", "start"]
