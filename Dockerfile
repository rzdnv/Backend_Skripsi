# Gunakan base image Node.js berbasis Debian
FROM node:20

# Set working directory di dalam container
WORKDIR /src

# Salin package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin seluruh kode sumber aplikasi
COPY . .

ARG DATABASE_URL
ARG ACCESS_TOKEN

# Mengatur variabel lingkungan dengan mendukung override dari environment
ENV DATABASE_URL=${DATABASE_URL}
ENV ACCESS_TOKEN=${ACCESS_TOKEN}

# Build app (jika menggunakan Next.js/Nuxt/tsc/dll)
RUN npx prisma generate
RUN npm run build

# Generate Prisma Client

# Expose port yang digunakan aplikasi
EXPOSE 8000

# Perintah untuk menjalankan aplikasi
CMD ["npm", "start"]
