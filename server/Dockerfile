FROM node:latest
WORKDIR /app
COPY ./package.json ./
ENV NODE_ENV=production
RUN npm install --production
COPY . .
CMD ["npm", "run", "start"]