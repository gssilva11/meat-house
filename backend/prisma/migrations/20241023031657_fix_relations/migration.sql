/*
  Warnings:

  - You are about to drop the column `cuttingType` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `Product` table. All the data in the column will be lost.
  - Added the required column `id_cuttingType` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_category` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_cuttingType_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_category_fkey";

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "cuttingType",
ADD COLUMN     "id_cuttingType" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "category",
ADD COLUMN     "id_category" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "Category"("id_category") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_id_cuttingType_fkey" FOREIGN KEY ("id_cuttingType") REFERENCES "CuttingType"("id_cuttingType") ON DELETE RESTRICT ON UPDATE CASCADE;
