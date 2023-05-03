FROM node:19-alpine3.16
RUN apk add g++ make py3-pip
WORKDIR /var/www/app
COPY package.json ./
RUN npm i
COPY . .
RUN npm run build
# RUN npx hardhat compile
# CMD ["npm", "run", "dev"]
CMD [ "npm", "start" ]
