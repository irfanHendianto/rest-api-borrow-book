import { sendApiError } from "@/utilitas/response.handler";
import { NextFunction, Response, Request } from "express";
import Joi from "joi";

export function validateRegisterUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const registerUserSchema = Joi.object({
    name: Joi.string().max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(8)
      .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/)
      .required()
      .error(
        new Error(
          "Password must be at least 8 characters and contain at least one uppercase letter and one number"
        )
      ),
  });
  const { error } = registerUserSchema.validate(req.body);
  if (error) {
    const message = error?.details ? error?.details[0]?.message : error.message;
    return sendApiError(res, 500, message);
  }
  next();
}

export function validateQuery(req: Request, res: Response, next: NextFunction) {
  const pagingQuerySchema = Joi.object({
    q: Joi.string().allow(''),
    page: Joi.number().integer().min(1).default(1),
    pageSize: Joi.number().integer().min(1).max(100).default(10),
    sortBy: Joi.string().default("created_at"),
    sortDirection: Joi.string()
      .valid("asc", "desc", "ASC", "DESC")
      .default("asc"),
  });

  const { error } = pagingQuerySchema.validate(req.query);
  if (error) {
    const message = error?.details ? error?.details[0]?.message : error.message;
    return sendApiError(res, 500, message);
  }
  next();
}

export function validateQueryAndParams(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const pagingQuerySchema = Joi.object({
    page: Joi.number().integer().min(1).default(1),
    pageSize: Joi.number().integer().min(1).max(100).default(10),
    sortBy: Joi.string().default("created_at"),
    sortDirection: Joi.string()
      .valid("asc", "desc", "ASC", "DESC")
      .default("asc"),
  });

  const paramSchema = Joi.object({
    id: Joi.number().integer().min(1),
  });

  const { error: paramError } = paramSchema.validate(req.params);
  const { error } = pagingQuerySchema.validate(req.query);

  if (paramError) {
    const message = paramError?.details ? paramError?.details[0]?.message : paramError.message;
    return sendApiError(res, 500, message);
  }

  if (error) {
    const message = error?.details ? error?.details[0]?.message : error.message;
    return sendApiError(res, 500, message);
  }
  next();
}

export function validateBorrowBook(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const borrowBookSchema = Joi.object({
    book_id: Joi.string().required(),
    loan_duration_days: Joi.number().required(),
  });
  const { error } = borrowBookSchema.validate(req.body);
  if (error) {
    const message = error?.details ? error?.details[0]?.message : error.message;
    return sendApiError(res, 500, message);
  }
  next();
}

export function validateParams(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const paramSchema = Joi.object({
    id: Joi.string().required(),
  });

  const { error: paramError } = paramSchema.validate(req.params);

  if (paramError) {
    const message = paramError?.details ? paramError?.details[0]?.message : paramError.message;
    return sendApiError(res, 500, message);
  }
  next();
}

