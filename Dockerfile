FROM node:18-alpine as BUILD_IMAGE

WORKDIR /app

COPY package.json yarn.lock vite.config.ts /app

RUN \
    --mount=type=cache,target=/var/cache/apt \
 yarn  

COPY . /app

RUN yarn build

FROM nginx:alpine
COPY --from=BUILD_IMAGE /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

