export const updateUser = async ({ id, userRole }) => {
	try {
	  const response = await fetch(`http://localhost:7001/api/users/${id}`, {
		method: 'PATCH',
		headers: {
		  'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
		  role_id: userRole,
		}),
	  });
  
	  // Если запрос не успешен
	  if (!response.ok) {
		throw new Error(
		  response.status === 404
			? 'Пользователь не найден'
			: 'Не удалось обновить пользователя. Попробуйте снова позднее.'
		);
	  }
  
	  // Парсим и возвращаем ответ
	  return await response.json();
	} catch (error) {
	  // Обрабатываем ошибку
	  return Promise.reject(error.message || 'Неизвестная ошибка при обновлении пользователя');
	}
  };