import meServerSideAPI from "../../api/meServerSide";

export default async function isUserLoggedIn(cookies: string) {
  try {
    const user = (await meServerSideAPI(cookies)).data;
    return { logged: true, user };
  } catch (error) {
    return { logged: false, user: null };
  }
}
