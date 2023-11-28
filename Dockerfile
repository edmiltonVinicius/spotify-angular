FROM node:20-alpine AS builder

RUN mkdir app
WORKDIR /app
COPY . .
RUN npm install -g @angular/cli@16
RUN npm install
RUN npm run build

FROM nginx:1.23.1-alpine

WORKDIR /app
COPY ./docker/nginx/ /etc/nginx/
COPY --from=builder /app/dist/ /usr/share/nginx/html/
COPY ./src/assets/ /usr/share/nginx/html/assets
EXPOSE 80

CMD ["/bin/sh",  "-c",  "exec nginx -g 'daemon off;'"]
