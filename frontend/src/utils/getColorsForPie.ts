const getColorsForPie = (color: string) => {
  if (color === "blue")
    return {
      low: "#BEE3F8",
      medium: "#63B3ED",
      high: "#2B6CB0",
      font: "#2A4365",
    };
  if (color === "yellow")
    return {
      low: "#FEFCBF",
      medium: "#F6E05E",
      high: "#B7791F",
      font: "#5F370E",
    };
  if (color === "purple")
    return {
      low: "#E9D8FD",
      medium: "#B794F4",
      high: "#6B46C1",
      font: "#44337A",
    };
  if (color === "pink")
    return {
      low: "#FED7E2",
      medium: "#F687B3",
      high: "#B83280",
      font: "#521B41",
    };

  return { low: "", medium: "", high: "" };
};

export default getColorsForPie;
