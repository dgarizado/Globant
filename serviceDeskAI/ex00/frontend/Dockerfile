
## -----------------------------
# BASE IMAGE
## -----------------------------
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./

## -----------------------------
# DEVELOPMENT STAGE
## -----------------------------
FROM base AS development

RUN npm ci
COPY . .
ENV NODE_ENV=development
EXPOSE 5173
CMD ["npm", "run", "dev"]

## -----------------------------
# BUILDER (production build)
## -----------------------------
FROM base AS builder
RUN npm ci
COPY . .
RUN npm run build

## -----------------------------
# RUNTIME (nginx static server)
## -----------------------------

FROM nginx:stable-alpine AS production

RUN rm -rf /usr/share/nginx/html/*


COPY --from=builder /app/dist /usr/share/nginx/html


EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]