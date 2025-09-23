FROM node:22-alpine

WORKDIR /usr/src/app

# Copy package.json and package-lock.json first for caching dependencies
COPY package*.json ./

# Install dependencies
RUN npm ci --omit=dev

COPY . .

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

EXPOSE 5000

# Map the needed volume to the data dir
VOLUME ["/usr/src/app/data"]