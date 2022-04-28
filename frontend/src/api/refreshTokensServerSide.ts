import axios from "axios";

const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/auth/refresh`;

const refreshTokensServerSide = async (rtCookie: string) => {
  return (
    await axios.post(
      endpoint,
      {},
      {
        withCredentials: true,
        headers: {
          Cookie: rtCookie,
        },
      }
    )
  ).headers["set-cookie"];
};

export default refreshTokensServerSide;
