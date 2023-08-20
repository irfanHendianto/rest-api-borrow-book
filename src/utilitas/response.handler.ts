import { Response } from 'express';

export const sendApiResponse = <T>(
  res: Response,
  statusCode: number,
  message: string,
  data?: T
) => {
  if (data !== undefined) {
    res.status(statusCode).json({ statusCode, message, data });
  } else {
    res.status(statusCode).json({ statusCode, message });
  }
};

export const sendApiError = (
  res: Response,
  statusCode: number,
  message: string
) => {
   res.status(statusCode).json({ statusCode, message });
};
