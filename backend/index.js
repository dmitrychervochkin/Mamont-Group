require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlerMiddleware');
const path = require('path');
const morgan = require('morgan');
const helmet = require('helmet');

const PORT = process.env.PORT || 3000;

const app = express();

// 🔹 Безопасность заголовков
app.use(helmet());

app.use((req, res, next) => {
	res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
	next();
});

// 🔹 Логирование HTTP-запросов
app.use(morgan('dev'));

app.use(cors());
app.use(express.json());
app.use(fileUpload({}));

// 🔹 Основные маршруты API
app.use('/api', router);

// 🔹 Статические файлы (переместил ниже API)
app.use('/static', express.static(path.join(__dirname, 'backend/static')));

// 🔹 Обработчик ошибок (должен быть последним Middleware)
app.use(errorHandler);

async function start() {
	try {
		await sequelize.authenticate();
		console.log('📡 Подключение к базе данных успешно');

		await sequelize.sync({ alter: true }); // Убрали `{ alter: true }`, чтобы избежать неожиданностей

		app.listen(PORT, () => console.log(`🚀 Сервер запущен на порту ${PORT}`));
	} catch (error) {
		console.error('❌ Ошибка при запуске сервера:', error);
		process.exit(1); // Завершаем процесс с кодом ошибки
	}
}

start();

// require('dotenv').config();
// const express = require('express');
// const sequelize = require('./db');
// const models = require('./models/models');
// const cors = require('cors');
// const fileUpload = require('express-fileupload');
// const router = require('./routes/index');
// const errorHandler = require('./middleware/ErrorHandlerMiddleware');
// const path = require('path');

// const PORT = process.env.PORT || 3000;

// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use(express.static(path.resolve(__dirname, 'static')));
// app.use(fileUpload({}));
// app.use('/api', router);

// // Обработка ошибок, последний Middleware
// app.use(errorHandler);

// async function start() {
// 	try {
// 		await sequelize.authenticate();
// 		await sequelize.sync({ alter: true });
// 		app.listen(PORT, () => console.log(`🚀 Сервер запущен на порту ${PORT}`));
// 	} catch (error) {
// 		console.log(error);
// 	}
// }

// start();
// // { force: true } { alter: true }
