FROM node:14.19.0-alpine as build-stage
RUN mkdir /frontend
WORKDIR /frontend

# Only copy files required to install node modules for caching purposes
COPY package.json ./
COPY yarn.lock ./
RUN yarn

COPY . .
RUN yarn build

FROM nginx:1.21-alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY --from=build-stage /frontend/build/ /usr/share/nginx/html
COPY --from=build-stage /frontend/nginx.conf /etc/nginx/conf.d/default.conf
