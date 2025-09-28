
# Auto-Bazar

Блок-схема №1

<img width="673" height="518" alt="Auto-Bazar drawio" src="https://github.com/user-attachments/assets/8b9fc2b6-2dea-4468-afaf-0267665e3b07" />

Блок-схема №2
<img width="621" height="911" alt="Auto-Bazar(2) drawio" src="https://github.com/user-attachments/assets/2484c819-98f1-40ae-b098-fbb8f31b7954" />


## Опис

Цей проєкт — веб-додаток для управління курсами з авторизацією користувачів, завантаженням файлів, публікацією постів та роботою з базою даних MongoDB.

Проєкт складається з бекенду на Node.js + Express + MongoDB і фронтенду (React ).

---

## Функціонал

- Реєстрація та авторизація користувачів (JWT)
- Захищені маршрути з перевіркою токена
- Керування користувачами (отримання профілю)
- Створення, редагування і видалення постів
- Завантаження файлів (картинок)
- Підключення до MongoDB через Mongoose
- Обробка помилок
- CORS для безпечного обміну між фронтендом і бекендом

---

## Технології

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (JSON Web Tokens)
- dotenv для роботи з environment variables
- CORS
- express-fileupload для завантаження файлів
- React (фронтенд — окремо)

---

## Встановлення та запуск

1. Клонувати репозиторій

```bash
git clone https://github.com/ByatesEduard/project_courses_work.git
cd project_courses_work
