const isJson = (data: string): boolean => {
  try {
    JSON.parse(data);
    return true;
  } catch (error) {
    return false;
  }
};

export default isJson;
