const getColorsForProjectStats = (color: string) => {
  if (color === "teal") {
    return { primaryColor: "#319795", secondaryColor: "#81E6D9" };
  } else if (color === "orange") {
    return { primaryColor: "#DD6B20", secondaryColor: "#FBD38D" };
  } else if (color === "red") {
    return { primaryColor: "#E53E3E", secondaryColor: "#FEB2B2" };
  } else if (color === "purple") {
    return { primaryColor: "#805AD5", secondaryColor: "#D6BCFA" };
  } else if (color === "blue") {
    return { primaryColor: "#3182CE", secondaryColor: "#90CDF4" };
  } else if (color === "gray") {
    return { primaryColor: "#718096", secondaryColor: "#CBD5E0" };
  } else if (color === "green") {
    return { primaryColor: "#38A169", secondaryColor: "#9AE6B4" };
  } else {
    return { primaryColor: "#319795", secondaryColor: "#38B2AC" };
  }
};

export default getColorsForProjectStats;
