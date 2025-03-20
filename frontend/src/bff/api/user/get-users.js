import { transformUsers } from '../../transformers';

export const getUsers = async () => {
	try {
		const response = await fetch('http://localhost:7001/api/users');

		// Если запрос не успешен
		if (!response.ok) {
			throw new Error(
				response.status === 404
					? 'Такая страница не существует'
					: 'Что-то пошло не так. Попробуйте ещё раз позднее.',
			);
		}

		// Парсим полученные данные
		const loadedUsers = await response.json();

		// Преобразуем пользователей, если они есть
		return loadedUsers ? loadedUsers.map(transformUsers) : [];
	} catch (error) {
		// Обрабатываем ошибку
		return Promise.reject(error.message || 'Неизвестная ошибка при получении данных пользователей');
	}
};
