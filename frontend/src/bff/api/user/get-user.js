export const getUser = async (email) => {
	try {
	  const response = await fetch(`http://localhost:7001/api/users/${email}`);
  
	  // Проверка на успешный ответ
	  if (!response.ok) {
		throw new Error(
		  response.status === 404
			? 'Пользователь не найден'
			: 'Что-то пошло не так. Попробуйте ещё раз позднее.'
		);
	  }
  
	  const loadedUser = await response.json();
	  return loadedUser;
  
	} catch (error) {
	  // Логирование или возврат ошибки
	  return Promise.reject(error.message || 'Неизвестная ошибка');
	}
  };