export default function transfromCookiesServerSide(
  cookies: string[] | undefined
) {
  if (!cookies) {
    return "";
  }

  const at = cookies[0].split(";")[0];
  const rt = cookies[1].split(";")[0];
  return at + "; " + rt;
}
