/*
  Warnings:

  - You are about to drop the column `id_customer` on the `Order` table. All the data in the column will be lost.
  - Added the required column `id_customer` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_id_customer_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "id_customer";

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "id_customer" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_id_customer_fkey" FOREIGN KEY ("id_customer") REFERENCES "Customer"("id_customer") ON DELETE RESTRICT ON UPDATE CASCADE;
