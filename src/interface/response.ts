interface DataInterface {
  statusCode: number;
  message: string;
}

export type ResponseInterface = string | Error | DataInterface;
