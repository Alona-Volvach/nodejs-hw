import express from 'express';
import 'dotenv/config';
import cors from 'cors';

import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import notesRoutes from './routes/notesRoutes.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

// Глобальні middleware
app.use(logger);         // 1. Логер першим — бачить усі запити
app.use(express.json()); // 2. Парсинг JSON-тіла
app.use(cors());         // 3. Дозвіл для запитів з інших доменів

// Кореневий маршрут

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello in my app!' });
});

// підключаємо групу маршрутів нотатків
app.use(notesRoutes);

// 404 і обробник помилок
app.use(notFoundHandler);

app.use(errorHandler);

// підключення до MongoDB

await connectMongoDB();

// запуск сервера

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
