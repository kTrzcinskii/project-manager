const transformBoolValueToString = (value: boolean | undefined | null) => {
  if (value === undefined || value === null) {
    return "all";
  } else if (value === true) {
    return "true";
  } else if (value === false) {
    return "false";
  } else {
    return "all";
  }
};

export default transformBoolValueToString;
