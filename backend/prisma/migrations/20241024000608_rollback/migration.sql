/*
  Warnings:

  - Made the column `id_address` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `id_user` on table `Order` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_id_address_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_id_user_fkey";

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "id_address" SET NOT NULL,
ALTER COLUMN "id_user" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_id_address_fkey" FOREIGN KEY ("id_address") REFERENCES "Address"("id_address") ON DELETE RESTRICT ON UPDATE CASCADE;
