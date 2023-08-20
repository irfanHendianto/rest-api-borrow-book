import express from "express";
import { listUserNotReturnBookByBookId, listBooks, borrowBook, recordBorrowByUser, returnBook } from "@/modules/books/handler";
import { authenticationAndDecode } from "@/middleware/authentication-middleware";
import { validateBorrowBook, validateParams, validateQuery } from "@/schema/schema-validation";

const router = express.Router();

// ADMIN
router.get("/book/list", authenticationAndDecode, validateQuery, listBooks);
router.get("/book/list-not-return/", authenticationAndDecode, validateQuery, listUserNotReturnBookByBookId);


// borrower
router.post("/book/borrow", authenticationAndDecode, validateBorrowBook, borrowBook);
router.get("/book/record-borrowed",authenticationAndDecode, recordBorrowByUser);
router.get("/book/return/:id", authenticationAndDecode, validateParams, returnBook);


export default router;
