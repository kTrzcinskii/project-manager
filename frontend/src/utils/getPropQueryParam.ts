const getPropQueryParam = (query: string) => {
  const param = query.split("=")[1];

  if (param === "inProgress") return "in progress";

  return param;
};

export default getPropQueryParam;
