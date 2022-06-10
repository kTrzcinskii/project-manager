const getPropQueryParam = (query: string) => {
  const param = query.split("=")[1];

  return param;
};

export default getPropQueryParam;
