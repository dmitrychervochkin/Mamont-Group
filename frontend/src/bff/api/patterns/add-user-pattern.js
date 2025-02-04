export const addUserPattern = (userId, patternId, token) =>
	fetch(`http://localhost:7001/api/user_pattern`, {
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
