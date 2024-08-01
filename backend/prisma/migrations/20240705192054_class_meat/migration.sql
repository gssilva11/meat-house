/*
  Warnings:

  - Added the required column `class` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Class" AS ENUM ('beef', 'pork', 'chicken', 'fish');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "class" "Class" NOT NULL;
