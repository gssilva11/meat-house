/*
  Warnings:

  - The primary key for the `Class` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `category` on the `Product` table. All the data in the column will be lost.
  - Added the required column `id_class` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_category_fkey";

-- AlterTable
ALTER TABLE "Class" DROP CONSTRAINT "Class_pkey",
ADD COLUMN     "id_class" SERIAL NOT NULL,
ADD CONSTRAINT "Class_pkey" PRIMARY KEY ("id_class");

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "category",
ADD COLUMN     "id_class" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_id_class_fkey" FOREIGN KEY ("id_class") REFERENCES "Class"("id_class") ON DELETE RESTRICT ON UPDATE CASCADE;
