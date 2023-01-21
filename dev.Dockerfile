# docker build -f dev.Dockerfile -t siraat-backend-dev .

FROM node:18-alpine

# Create app directory
WORKDIR /app

#copy packagejson, package-lock json, ts config
COPY ["package.json", "package-lock.json", "tsconfig.json", ".env", "./"]

#copy src file
COPY ./src ./src

# install dependencies
RUN npm install --legacy-peer-deps

# run the app
CMD ["npm", "run", "dev"]