/*
  Warnings:

  - You are about to drop the `Water` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Water" DROP CONSTRAINT "Water_userId_fkey";

-- DropTable
DROP TABLE "Water";
