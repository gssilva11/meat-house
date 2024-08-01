/*
  Warnings:

  - You are about to drop the column `imageProdutc` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[imageProduct]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `imageProduct` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Product_imageProdutc_key";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "imageProdutc",
ADD COLUMN     "imageProduct" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Product_imageProduct_key" ON "Product"("imageProduct");
