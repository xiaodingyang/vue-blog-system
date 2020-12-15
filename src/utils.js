export const queryString = (jsonData) => {
  try {
    let str = '';
    for (let [k, v] of Object.entries(jsonData)) {
      str += `&${k}=${v}`;
    }
    return str.slice(1);
  } catch (error) {
    return '';
  }
};
