export const loginUser = async (email, password) => {
	try {
		const response = await fetch('http://localhost:7001/api/users/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify({
				email,
				password,
			}),
		});

		// Проверка на успешный ответ
		if (!response.ok) {
			throw new Error(
				response.status === 400
					? 'Неверный email или пароль'
					: 'Ошибка при авторизации. Попробуйте снова.',
			);
		}

		// Парсим ответ
		const createdUser = await response.json();

		return createdUser;
	} catch (error) {
		// Логируем ошибку или передаем её
		return Promise.reject(error.message || 'Неизвестная ошибка при авторизации');
	}
};
