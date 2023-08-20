import prisma from "../src/lib/db-connection";
import { categories, books } from "../data/data-dummy"; // Pastikan impor data dari file yang benar

async function main() {
  try {
    // Insert categories
    await prisma.categories.createMany({
      data: categories,
    });

    // Insert books
    await prisma.books.createMany({
      data: books,
    });

    // Insert users
    await prisma.users.create({
      data: {
        name: "admin",
        email: "admin@gmail.com",
        password: "$2b$12$NY411WL0eWu9bcVcb2Df2e6DoLozV10f/aRlBcg8OXHL80cPFRrcy", // admin
        role: "admin"
      },
    });
    console.log("Seed data inserted successfully");
  } catch (error) {
    console.error("Error inserting seed data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
