FROM node:latest
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
ENV NODE_ENV=production
RUN npm install --production
CMD ["npm", "run", "start"]