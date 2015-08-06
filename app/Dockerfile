FROM node:latest
ADD . /data/hodavidhara/
WORKDIR /data/hodavidhara/

RUN npm install
RUN npm install -g nodemon

EXPOSE 3000

CMD ["npm", "run-script", "startd"]