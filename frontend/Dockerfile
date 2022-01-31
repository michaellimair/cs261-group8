FROM node
RUN mkdir /frontend
WORKDIR /frontend

##COPY package.json yarn.lock ./
##RUN yarn
COPY . /frontend/
RUN yarn 
RUN yarn build
