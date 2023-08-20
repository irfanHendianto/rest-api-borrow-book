-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('admin', 'borrower');

-- CreateTable
CREATE TABLE "Categories" (
    "id" UUID NOT NULL,
    "category_name" TEXT NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Books" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "book_name" TEXT NOT NULL,
    "category_ids" UUID[],
    "page" INTEGER NOT NULL,
    "qty" INTEGER NOT NULL,

    CONSTRAINT "Books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(20) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'borrower',

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoanRecord" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "borrow_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "return_date" TIMESTAMP(3),
    "loan_duration_days" INTEGER NOT NULL,
    "user_id" UUID NOT NULL,
    "book_id" UUID NOT NULL,

    CONSTRAINT "LoanRecord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "LoanRecord" ADD CONSTRAINT "LoanRecord_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoanRecord" ADD CONSTRAINT "LoanRecord_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
