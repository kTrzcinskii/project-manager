import ISuccessful from "./ISuccessful";

export default interface ISuccessfulWithTokens extends ISuccessful {
  tokens: {
    access_token: string;
    refresh_token: string;
  };
}
