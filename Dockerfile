FROM node:20

# Create app directory
WORKDIR /app

COPY package*.json ./
RUN npm install

# bundle app source
COPY . .

# must have postgres sql server running
# RUN npm run typeorm migration:run

RUN npm run build

EXPOSE 8000
RUN npm run typeorm migration:run
CMD ["node", "dist/main.js"]