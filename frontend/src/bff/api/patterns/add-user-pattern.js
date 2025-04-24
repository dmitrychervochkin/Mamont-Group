export const addUserPattern = (userId, patternId, token) =>
	fetch(`${process.env.REACT_APP_API_URL}/api/user_patterns`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
			Authorization: `Bearer ${JSON.parse(token)}`,
		},
		body: JSON.stringify({
			userId,
			patternId,
		}),
	}).then((data) => data.json());
