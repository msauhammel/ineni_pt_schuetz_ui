# Stage 1: Build Angular
FROM node:18-alpine as build-step
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

# Stage 2: Serve with NGINX
FROM nginx:alpine

# Clean up default files
RUN rm -rf /usr/share/nginx/html/* \
    && rm /etc/nginx/conf.d/default.conf

# Copy custom config and built app
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build-step /app/dist/inenipt-project-ui /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
