export const getTypes = () => fetch(`http://localhost:7001/api/types`).then((data) => data.json());
