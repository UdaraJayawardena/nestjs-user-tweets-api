# Stage 1: Build (Development)
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Generate Prisma client and apply migrations
RUN npx prisma generate
# For dev, you can run migrate dev with a dummy name; in prod use migrate deploy
# RUN npx prisma migrate dev --name init --skip-seed

# Build the NestJS app
RUN npm run build

# Stage 2: Production
FROM node:20-alpine

WORKDIR /app

# Copy package files and install only production deps
COPY package*.json ./
RUN npm install --only=production

# Copy built code and Prisma schema
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules

# Start the app
CMD ["node", "dist/main"]
