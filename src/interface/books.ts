export interface BooksResponse {
  id?: string;
  book_name?: string;
  qty?: number;
  available_qty?: number;
  categories?: string[];
  loan_duration_days?: number;
  return_date?: Date
}


export interface BorrowBook {
  user_id?: string;
  book_id?: string;
  loan_duration_days?: number;
}
