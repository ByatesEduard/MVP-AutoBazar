# Налаштування змінних середовища

## 📋 Кроки для налаштування

### 1. Сервер (.env)

1. **Скопіюйте файл прикладу:**
```bash
cd server
cp env.example .env
```

2. **Відредагуйте файл `.env` з вашими налаштуваннями:**

#### Обов'язкові налаштування:
```env
# Server Configuration
PORT=3002
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/autobazar

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
JWT_EXPIRE=30d

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

#### Опціональні налаштування:
```env
# Email Configuration (для відправки email)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_email_password

# Payment Configuration (для платежів)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key

# Cloud Storage (для зображень)
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

### 2. Клієнт (.env)

1. **Скопіюйте файл прикладу:**
```bash
cd client
cp env.example .env
```

2. **Відредагуйте файл `.env` з вашими налаштуваннями:**

#### Обов'язкові налаштування:
```env
# Client Configuration
REACT_APP_API_URL=http://localhost:3002/api
REACT_APP_SOCKET_URL=http://localhost:3002
```

#### Опціональні налаштування:
```env
# Google Maps API (для карт)
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# Stripe Configuration (для платежів)
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key

# Cloudinary Configuration (для зображень)
REACT_APP_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
REACT_APP_CLOUDINARY_UPLOAD_PRESET=your_upload_preset

# Firebase Configuration (для push-повідомлень)
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

## 🔐 Безпека

### Важливі моменти:

1. **Ніколи не комітьте файли `.env` в Git:**
```bash
# Переконайтеся, що .env файли в .gitignore
echo ".env" >> .gitignore
echo "*.env" >> .gitignore
```

2. **Змініть JWT_SECRET на унікальний:**
```env
JWT_SECRET=my_super_secret_key_123456789_abcdef
```

3. **Для продакшну використовуйте сильніші ключі:**
```env
JWT_SECRET=your_very_long_and_complex_secret_key_here
```

## 🚀 Запуск з новими налаштуваннями

### Після налаштування .env файлів:

1. **Перезапустіть сервер:**
```bash
cd server
npm run dev
```

2. **Перезапустіть клієнт:**
```bash
cd client
npm start
```

## 📝 Приклади налаштувань

### Для розробки:
```env
# server/.env
PORT=3002
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/autobazar_dev
JWT_SECRET=dev_secret_key_123
CORS_ORIGIN=http://localhost:3000
```

### Для продакшну:
```env
# server/.env
PORT=3002
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/autobazar_prod
JWT_SECRET=your_very_secure_production_secret_key
CORS_ORIGIN=https://yourdomain.com
```

## 🔧 Перевірка налаштувань

### Перевірте, чи правильно завантажуються змінні:

1. **На сервері:**
```javascript
console.log('PORT:', process.env.PORT);
console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('NODE_ENV:', process.env.NODE_ENV);
```

2. **На клієнті:**
```javascript
console.log('API URL:', process.env.REACT_APP_API_URL);
console.log('App Name:', process.env.REACT_APP_APP_NAME);
```

## ❗ Помилки та рішення

### Помилка: "Cannot find module 'dotenv'"
```bash
npm install dotenv
```

### Помилка: "Environment variable not found"
- Перевірте, чи файл `.env` знаходиться в правильній папці
- Перевірте синтаксис файлу (без пробілів навколо `=`)
- Перезапустіть сервер після зміни .env

### Помилка: "CORS error"
- Перевірте `CORS_ORIGIN` в server/.env
- Переконайтеся, що URL клієнта відповідає налаштуванням

## 📞 Підтримка

Якщо виникли проблеми з налаштуванням, перевірте:
1. Синтаксис .env файлів
2. Правильність URL та портів
3. Доступність MongoDB
4. Логи сервера на наявність помилок



