/*
  Warnings:

  - You are about to drop the column `date_order` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `id_customer` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `id_cuttingType` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `thickness` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `Product` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Class` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Customer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CustomerAddress` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `datetime_order` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_address` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_user` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cuttingType` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CustomerAddress" DROP CONSTRAINT "CustomerAddress_id_customer_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_id_customer_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_id_cuttingType_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_category_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "date_order",
DROP COLUMN "id_customer",
ADD COLUMN     "datetime_order" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "id_address" INTEGER NOT NULL,
ADD COLUMN     "id_user" INTEGER NOT NULL,
ADD COLUMN     "total" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "id_cuttingType",
DROP COLUMN "thickness",
ADD COLUMN     "cuttingType" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "weight";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "id_user" SERIAL NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id_user");

-- DropTable
DROP TABLE "Class";

-- DropTable
DROP TABLE "Customer";

-- DropTable
DROP TABLE "CustomerAddress";

-- DropEnum
DROP TYPE "Thickness";

-- CreateTable
CREATE TABLE "Category" (
    "id_category" SERIAL NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id_category")
);

-- CreateTable
CREATE TABLE "Address" (
    "id_address" SERIAL NOT NULL,
    "id_user" INTEGER NOT NULL,
    "street_name" TEXT NOT NULL,
    "house_number" INTEGER NOT NULL,
    "complements" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_category_key" ON "Category"("category");

-- CreateIndex
CREATE UNIQUE INDEX "Address_id_address_key" ON "Address"("id_address");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_category_fkey" FOREIGN KEY ("category") REFERENCES "Category"("category") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_id_address_fkey" FOREIGN KEY ("id_address") REFERENCES "Address"("id_address") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_cuttingType_fkey" FOREIGN KEY ("cuttingType") REFERENCES "CuttingType"("cuttingType") ON DELETE RESTRICT ON UPDATE CASCADE;
