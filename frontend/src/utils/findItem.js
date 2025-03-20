export const findItem = (array = [], id) => array?.find((item) => item.id === id) ?? null;
