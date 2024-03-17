FROM node:19-alpine3.16 AS builder


ARG PUBLIC_MAINTENANCE_MODE
ARG PUBLIC_MAINTENANCE_MESSAGE
ARG PUBLIC_REST_DISABLED
ARG PUBLIC_REST_DISABLED_MESSAGE
ARG PUBLIC_MISP_API_ENDPOINT
ARG PUBLIC_DATE_FORMAT

WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build


FROM nginx:latest
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/build /usr/share/nginx/html/
