FROM node:latest
ADD . /code
WORKDIR /code

RUN npm install
RUN npm install -g nodemon

EXPOSE 3000

CMD ["npm", "run-script", "startd"]