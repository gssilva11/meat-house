-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_id_address_fkey";

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "id_address" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_id_address_fkey" FOREIGN KEY ("id_address") REFERENCES "Address"("id_address") ON DELETE SET NULL ON UPDATE CASCADE;
