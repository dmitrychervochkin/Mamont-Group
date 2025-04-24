export const getRoles = async () =>
	fetch(`${process.env.REACT_APP_API_URL}api/roles`)
		.catch((res) => {
			if (res.ok) {
				return res;
			}

			const error =
				res.status === 404
					? 'Такая страница не существует'
					: 'Что-то пошло не так. Попробуйте ещё раз позднее.';
			return Promise.reject(error);
		})
		.then((loadedUser) => loadedUser.json());
