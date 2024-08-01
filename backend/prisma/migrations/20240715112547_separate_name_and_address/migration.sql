/*
  Warnings:

  - You are about to drop the column `city` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `complements` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `house_number` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `neighborhood` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `street_name` on the `Customer` table. All the data in the column will be lost.
  - Added the required column `id_address` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "city",
DROP COLUMN "complements",
DROP COLUMN "house_number",
DROP COLUMN "neighborhood",
DROP COLUMN "state",
DROP COLUMN "street_name",
ADD COLUMN     "id_address" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "CustomerAddress" (
    "id_address" SERIAL NOT NULL,
    "street_name" TEXT NOT NULL,
    "house_number" INTEGER NOT NULL,
    "complements" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "CustomerAddress_id_address_key" ON "CustomerAddress"("id_address");

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_id_address_fkey" FOREIGN KEY ("id_address") REFERENCES "CustomerAddress"("id_address") ON DELETE RESTRICT ON UPDATE CASCADE;
