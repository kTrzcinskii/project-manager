import IMe from "../interfaces/IMe";
import axiosInstance from "../utils/axiosInstance";

const endpoint = "/user/me";

const meClientSide = async () => {
  const response = await axiosInstance.get<IMe>(endpoint);
  return response.data;
};

export default meClientSide;
