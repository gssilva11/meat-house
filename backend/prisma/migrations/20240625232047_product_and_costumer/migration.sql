/*
  Warnings:

  - Changed the type of `house_number` on the `Customer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `quantity` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Unit" AS ENUM ('GRAMAS', 'QUANTIDADE');

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "house_number",
ADD COLUMN     "house_number" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "quantity" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "unit" "Unit" NOT NULL;
