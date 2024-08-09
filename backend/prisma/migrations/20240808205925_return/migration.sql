/*
  Warnings:

  - The primary key for the `Class` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_class` on the `Class` table. All the data in the column will be lost.
  - You are about to drop the column `id_class` on the `Product` table. All the data in the column will be lost.
  - Added the required column `category` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_id_class_fkey";

-- AlterTable
ALTER TABLE "Class" DROP CONSTRAINT "Class_pkey",
DROP COLUMN "id_class",
ADD CONSTRAINT "Class_pkey" PRIMARY KEY ("class");

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "id_class",
ADD COLUMN     "category" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_category_fkey" FOREIGN KEY ("category") REFERENCES "Class"("class") ON DELETE RESTRICT ON UPDATE CASCADE;
