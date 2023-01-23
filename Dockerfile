FROM node:19-alpine3.16
RUN apk add g++ make py3-pip
WORKDIR /app
COPY package.json ./
RUN npm i
COPY . .
RUN npx hardhat compile
CMD ["npm", "run", "dev"]
