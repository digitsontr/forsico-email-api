# Base image olarak Node.js'in resmi imajını kullanalım
FROM node:18-alpine

# Çalışma dizinini oluştur
WORKDIR /usr/src/app

# Package.json ve package-lock.json dosyalarını kopyala
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm install

# Uygulama kaynak kodlarını kopyala
COPY . .

# Uygulama için kullanılacak portu belirt
EXPOSE 8080

# Environment variables
ENV NODE_ENV=production

# Uygulamayı başlat
CMD ["npm", "start"] 