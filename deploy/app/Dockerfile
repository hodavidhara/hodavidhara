FROM node:latest
ADD ../../app /opt/hodavidhara
WORKDIR /hodavidhara

RUN npm install
RUN npm install -g nodemon

EXPOSE 3000

CMD ["npm", "run-script", "startd"]