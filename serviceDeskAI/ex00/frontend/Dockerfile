# Stage 1 — builder
FROM node:20-alpine AS builder
WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm ci

# Copy sources and build
COPY . .
RUN npm run build

# Stage 2 — runtime (nginx)
FROM nginx:stable-alpine AS runner
# Remove default nginx static content
RUN rm -rf /usr/share/nginx/html/*

# Copy built files
COPY --from=builder /app/dist /usr/share/nginx/html

# Optional: copy a custom nginx config for SPA fallback (see note below)
# COPY docker/nginx.frontend.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]