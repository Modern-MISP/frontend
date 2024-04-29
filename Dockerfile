FROM node:19-alpine3.16 AS builder

WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build


FROM nginx:alpine-slim
COPY nginx.conf /etc/nginx/nginx.conf
COPY startup.sh /docker-entrypoint.d/
RUN chmod +x /docker-entrypoint.d/startup.sh
COPY --from=builder /app/build /usr/share/nginx/html/
