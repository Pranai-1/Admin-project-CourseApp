/*
  Warnings:

  - Changed the type of `adminId` on the `Courses` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Courses" DROP COLUMN "adminId",
ADD COLUMN     "adminId" INTEGER NOT NULL;
