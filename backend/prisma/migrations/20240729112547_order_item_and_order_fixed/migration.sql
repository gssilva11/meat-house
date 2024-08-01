/*
  Warnings:

  - You are about to drop the column `id_orderItem` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `id_customer` on the `OrderItem` table. All the data in the column will be lost.
  - Added the required column `id_customer` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_order` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_id_orderItem_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_id_customer_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "id_orderItem",
ADD COLUMN     "id_customer" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "id_customer",
ADD COLUMN     "id_order" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_id_customer_fkey" FOREIGN KEY ("id_customer") REFERENCES "Customer"("id_customer") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_id_order_fkey" FOREIGN KEY ("id_order") REFERENCES "Order"("id_order") ON DELETE RESTRICT ON UPDATE CASCADE;
