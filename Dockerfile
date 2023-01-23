FROM node:19-alpine3.16
WORKDIR /app
COPY package.json ./
RUN npm i
COPY . .
RUN npx hardhat compile
CMD ["npm", "run", "dev"]
