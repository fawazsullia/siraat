FROM node:18-alpine

# Create app directory
WORKDIR /app

#copy packagejson, package-lock json, ts config
COPY ["package.json", "package-lock.json", "tsconfig.json", ".env", "./"]

#copy src file
COPY ./src ./src

# install dependencies
RUN npm install --production --legacy-peer-deps

RUN npm run build

# run the app
CMD ["npm", "run", "start"]