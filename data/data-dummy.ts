export const categories = [
  {
    id: "139cea44-2eec-48af-8b88-98d26b7a6b98",
    category_name: "Fiction",
  },
  {
    id: "ed74919c-1f7e-4325-82f5-6a671d2d2739",
    category_name: "Non-Fiction",
  },
  {
    id: "94f34847-b13b-4599-9813-8ada361e4a9a",
    category_name: "Mystery",
  },
  {
    id: "1102d252-cdf6-49f2-a467-3e7dc351fa50",
    category_name: "Fantasy",
  },
  {
    id: "05342ca4-8827-478b-9b20-58be4d6a397b",
    category_name: "Science Fiction",
  },
];

export const books = [
  {
    id: "b6c52214-5187-4b7a-a7e3-7e0904f4f9a1",
    book_name: "The Great Gatsby",
    category_ids: [
      "139cea44-2eec-48af-8b88-98d26b7a6b98",
      "ed74919c-1f7e-4325-82f5-6a671d2d2739",
    ],
    page: 256,
    qty: 5,
  },
  {
    id: "c7de6780-9e02-4ff6-94c6-b2bdcf73b433",
    book_name: "To Kill a Mockingbird",
    category_ids: [
      "139cea44-2eec-48af-8b88-98d26b7a6b98",
      "ed74919c-1f7e-4325-82f5-6a671d2d2739",
    ],
    page: 336,
    qty: 5,
  },
  {
    id: "8fbbf566-6337-4e7e-a1d6-0cc38e582832",
    book_name: "The Da Vinci Code",
    category_ids: [
      "94f34847-b13b-4599-9813-8ada361e4a9a",
      "1102d252-cdf6-49f2-a467-3e7dc351fa50",
    ],
    page: 454,
    qty: 5,
  },
  {
    id: "f85b8eaf-825f-49b2-9c06-d6c8a4da85d6",
    book_name: "Harry Potter and the Sorcerer's Stone",
    category_ids: ["05342ca4-8827-478b-9b20-58be4d6a397b"],
    page: 320,
    qty: 5,
  },
  {
    id: "b7723e8a-ef0b-4055-b264-463f0cbf4f0e",
    book_name: "Dune",
    category_ids: ["1102d252-cdf6-49f2-a467-3e7dc351fa50"],
    page: 688,
    qty: 5,
  },
];
