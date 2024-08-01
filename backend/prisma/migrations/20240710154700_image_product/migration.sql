/*
  Warnings:

  - A unique constraint covering the columns `[imageProdutc]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `imageProdutc` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "imageProdutc" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Product_imageProdutc_key" ON "Product"("imageProdutc");