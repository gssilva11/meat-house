/*
  Warnings:

  - You are about to drop the column `class` on the `Product` table. All the data in the column will be lost.
  - Added the required column `category` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "class",
ADD COLUMN     "category" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Class";

-- CreateTable
CREATE TABLE "Class" (
    "class" TEXT NOT NULL,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("class")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_category_fkey" FOREIGN KEY ("category") REFERENCES "Class"("class") ON DELETE RESTRICT ON UPDATE CASCADE;
