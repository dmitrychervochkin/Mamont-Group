export const deleteUser = async (id, token) => {
	try {
		const response = await fetch(`${process.env.REACT_APP_API_URL}api/users/${id}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${JSON.parse(token)}`,
			},
		});

		// Если запрос не успешен, выбрасываем ошибку с описанием
		if (!response.ok) {
			throw new Error(
				response.status === 404
					? 'Пользователь не найден'
					: 'Не удалось удалить пользователя. Попробуйте снова позже.',
			);
		}

		return { success: true, message: 'Пользователь успешно удален' };
	} catch (error) {
		// Обрабатываем ошибки и возвращаем сообщение
		return { success: false, message: error.message || 'Неизвестная ошибка при удалении пользователя' };
	}
};
