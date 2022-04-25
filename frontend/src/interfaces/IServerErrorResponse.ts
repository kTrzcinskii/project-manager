interface IServerErrorResponse {
  statusCode: number;
  message: string | string[];
  error: string;
}

export default IServerErrorResponse;
