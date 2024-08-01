/*
  Warnings:

  - You are about to drop the column `quantity` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `unit` on the `Product` table. All the data in the column will be lost.
  - Added the required column `id_cuttingType` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Thickness" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "id_cuttingType" INTEGER NOT NULL,
ADD COLUMN     "thickness" "Thickness" NOT NULL DEFAULT 'MEDIUM';

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "quantity",
DROP COLUMN "unit",
ADD COLUMN     "weight" DECIMAL(65,30) NOT NULL;

-- DropEnum
DROP TYPE "Unit";

-- CreateTable
CREATE TABLE "CuttingType" (
    "id_cuttingType" SERIAL NOT NULL,
    "cuttingType" TEXT NOT NULL,

    CONSTRAINT "CuttingType_pkey" PRIMARY KEY ("id_cuttingType")
);

-- CreateIndex
CREATE UNIQUE INDEX "CuttingType_cuttingType_key" ON "CuttingType"("cuttingType");

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_id_cuttingType_fkey" FOREIGN KEY ("id_cuttingType") REFERENCES "CuttingType"("id_cuttingType") ON DELETE RESTRICT ON UPDATE CASCADE;
