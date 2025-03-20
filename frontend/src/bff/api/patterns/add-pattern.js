export const addPattern = (patternData, token) =>
	fetch(`http://localhost:7001/api/patterns`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
			Authorization: `Bearer ${JSON.parse(token)}`,
		},
		body: JSON.stringify({
			name: patternData.name,
			description: patternData.description,
		}),
	}).then((data) => data.json());
