# Stage 1: Build the Angular app
FROM node:18-alpine as build-step
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

# Stage 2: Serve the app with NGINX
FROM nginx:alpine

# Copy custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build-step /app/dist/inenipt-project-ui /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
