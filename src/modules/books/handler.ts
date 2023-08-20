import { BorrowBook } from "@/interface/books";
import { QueryParams } from "@/interface/request";
import {
  listUserNotReturnBookByBookIdService,
  listBookService,
  borrowBookService,
  getBorroweredbookByUser,
  returnBookService,
} from "@/repository/books";
import { sendApiResponse, sendApiError } from "@/utilitas/response.handler";
import { Request, Response } from "express";

export const listBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const query = req.query as QueryParams;
    const result = await listBookService(query);
    return sendApiResponse(res, 200, "succeess", result);
  } catch (error) {
    const message = error?.message
      ? error.message
      : "Invalid Email Or Password";
    return sendApiError(res, 500, message);
  }
};

export const listUserNotReturnBookByBookId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const query = req.query as QueryParams;
    const result = await listUserNotReturnBookByBookIdService(query);
    return sendApiResponse(res, 200, "succeess", result);
  } catch (error) {
    const message = error?.message
      ? error.message
      : "Invalid Email Or Password";
    return sendApiError(res, 500, message);
  }
};

export const borrowBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const payload: BorrowBook = {
      ...req.body,
      user_id: req.user.user_id,
    };
    const listBorrowed = await getBorroweredbookByUser(payload.user_id, null);
    if (listBorrowed && listBorrowed.length > 0) {
      const isNotReturn = listBorrowed.some(
        (val: any) => val.return_date === null
      );
      if (isNotReturn)
        throw new Error(
          "You must return the borrowed book to borrow another book."
        );
    }
    await borrowBookService(payload);
    return sendApiResponse(res, 200, "succeess");
  } catch (error) {
    const message = error?.message
      ? error.message
      : "Invalid Email Or Password";
    return sendApiError(res, 500, message);
  }
};

export const recordBorrowByUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const listBorrowed = await getBorroweredbookByUser(
      req.user.user_id,
      req.query as QueryParams
    );
    return sendApiResponse(res, 200, "succeess", listBorrowed);
  } catch (error) {
    const message = error?.message
      ? error.message
      : "Invalid Email Or Password";
    return sendApiError(res, 500, message);
  }
};

export const returnBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const payload: BorrowBook = {
      book_id: req.params.id,
      user_id: req.user.user_id,
    };
    await returnBookService(payload);
    return sendApiResponse(res, 200, "succeess");
  } catch (error) {
    const message = error?.message
      ? error.message
      : "Invalid Email Or Password";
    return sendApiError(res, 500, message);
  }
};
