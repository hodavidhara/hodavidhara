FROM node:latest
ADD . /code
WORKDIR /code
EXPOSE 3000

RUN npm install
RUN npm install -g nodemon
RUN npm install -g gulp
RUN npm install -g bower

RUN bower install --allow-root

ENV NODE_ENV prod

CMD ["npm", "run-script", "prod"]