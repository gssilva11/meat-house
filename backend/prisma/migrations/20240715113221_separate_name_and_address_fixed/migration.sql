/*
  Warnings:

  - You are about to drop the column `id_address` on the `Customer` table. All the data in the column will be lost.
  - Added the required column `id_customer` to the `CustomerAddress` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_id_address_fkey";

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "id_address";

-- AlterTable
ALTER TABLE "CustomerAddress" ADD COLUMN     "id_customer" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "CustomerAddress" ADD CONSTRAINT "CustomerAddress_id_customer_fkey" FOREIGN KEY ("id_customer") REFERENCES "Customer"("id_customer") ON DELETE RESTRICT ON UPDATE CASCADE;
