import { BooksResponse, BorrowBook } from "@/interface/books";
import { IResponse, QueryParams } from "@/interface/request";
import prisma from "@/lib/db-connection";
import { getSqlLimitFragment, getSqlSortFragment } from "@/lib/helpers";

export async function getBorroweredbookByUser(
  user_id: string,
  query: QueryParams
): Promise<BooksResponse[]> {
  let optional: any = {};
  if (query) {
    const { page, pageSize } = query;
    const skip = (page - 1) * pageSize;
    optional = {
      skip: skip,
      take: pageSize,
    };
  }
  const loanRecordByUser = await prisma.loanRecord.findMany({
    where: {
      user_id: user_id,
    },
    select: {
      id: true,
      borrow_date: true,
      loan_duration_days: true,
      return_date: true,
      book_id: true,
      books: {
        select: {
          book_name: true,
        },
      },
      ...optional,
    },
    orderBy: {
      return_date: "desc",
    },
  });
  return loanRecordByUser;
}

export async function listBookService(
  payload: QueryParams
): Promise<IResponse<BooksResponse[]>> {
  const { page, pageSize, sortBy, sortDirection } = payload;
  let { q } = payload;
  const sqlSort: string = getSqlSortFragment(sortBy, sortDirection);
  const limitOffset: string = getSqlLimitFragment(page, pageSize);
  let where = "";
  const params = [];
  if (q && q.length) {
    where = "WHERE book_name ilike $1";
    q = `%${q}%`;
    params.push(q);
  }
  const query: any = `
      SELECT id, book_name, page, qty,
      (QTY - COALESCE((
        SELECT COUNT(*)
        FROM "LoanRecord" lr 
        WHERE return_date IS NULL
        AND lr.book_id = b.id
      ),0))::INTEGER AS available_qty,
      (
        SELECT array_to_json(array_agg(T))
        FROM (
          SELECT id, category_name
          FROM "Categories" c 
          WHERE c.id IN (SELECT UNNEST(category_ids))
        ) T
     ) AS categories
     FROM "Books" b
     ${where}
     ${sqlSort} ${limitOffset}
    `;

  const queryCount = `
    SELECT COUNT(*)::INTEGER
    FROM "Books" 
    ${where}
  `;
  const books: any = await prisma.$queryRawUnsafe(query, ...params);
  const totalCount: number = await prisma.$queryRawUnsafe(
    queryCount,
    ...params
  );
  return {
    data: books,
    totalCount: Number(totalCount[0].count),
  };
}

export async function listUserNotReturnBookByBookIdService(
  payload: QueryParams
): Promise<IResponse<BooksResponse[]>> {
  const { page, pageSize, sortBy, sortDirection } = payload;
  let { q } = payload;
  const sqlSort: string = getSqlSortFragment(sortBy, sortDirection);
  const limitOffset: string = getSqlLimitFragment(page, pageSize);
  let where = "WHERE return_date IS NULL";
  const params = [];
  if (q && q.length) {
    where = "AND book_name ~* $1 OR name ~* $1";
    q = `%${q}%`;
    params.push(q);
  }
  const query: any = `
    SELECT lr.id, lr.user_id, u.name, lr.book_id, b.book_name
    FROM "LoanRecord" lr
    JOIN "Users" u ON u.id = lr.user_id
    JOIN "Books" b ON b.id = lr.book_id 
    ${where}
    ${sqlSort} ${limitOffset}
  `;

  const queryCount = `
    SELECT COUNT(*)::INTEGER
    FROM "LoanRecord" 
    ${where}
  `;
  const books: any = await prisma.$queryRawUnsafe(query, ...params);
  const totalCount: number = await prisma.$queryRawUnsafe(
    queryCount,
    ...params
  );
  return {
    data: books,
    totalCount: Number(totalCount[0].count),
  };
}

export async function borrowBookService(payload: BorrowBook): Promise<void> {
  const { user_id, book_id, loan_duration_days } = payload;
  await prisma.loanRecord.create({
    data: {
      user_id: user_id,
      book_id: book_id,
      loan_duration_days: loan_duration_days,
    },
  });
}

export async function returnBookService(payload: BorrowBook): Promise<void> {
  const { user_id, book_id } = payload;
  await prisma.loanRecord.updateMany({
    where: {
      AND: [{ book_id: book_id }, { user_id: user_id }],
    },
    data: {
      return_date: new Date(),
    },
  });
}
