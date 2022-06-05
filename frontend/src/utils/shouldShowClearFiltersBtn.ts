const shouldShowClearFiltersBtns = (
  query: string,
  propQuery: string
): boolean => {
  query = query.replace(propQuery, "");

  if (!query) {
    return false;
  }

  const globalRegexp = new RegExp("&\\w+=[^&]+", "igm");

  const fields = query.match(globalRegexp);
  if (!fields) {
    return false;
  }
  const newFields = fields.map((field) => field.split("=")[0].slice(1));
  if (newFields.length === 1 && newFields[0] === "srt") {
    return false;
  }

  return true;
};

export default shouldShowClearFiltersBtns;
