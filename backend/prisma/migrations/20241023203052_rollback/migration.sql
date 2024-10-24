/*
  Warnings:

  - You are about to drop the column `id_cuttingType` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `id_category` on the `Product` table. All the data in the column will be lost.
  - Added the required column `cuttingType` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_id_cuttingType_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_id_category_fkey";

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "id_cuttingType",
ADD COLUMN     "cuttingType" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "id_category",
ADD COLUMN     "category" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_category_fkey" FOREIGN KEY ("category") REFERENCES "Category"("category") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_cuttingType_fkey" FOREIGN KEY ("cuttingType") REFERENCES "CuttingType"("cuttingType") ON DELETE RESTRICT ON UPDATE CASCADE;
