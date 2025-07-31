FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./

# Instala dependencias necesarias para Alpine
RUN apk add --no-cache python3 make g++ && \
    npm install --legacy-peer-deps

COPY . .

# Build con variables optimizadas
ENV NODE_ENV=production
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80