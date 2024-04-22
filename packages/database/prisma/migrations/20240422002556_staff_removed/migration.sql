/*
  Warnings:

  - You are about to drop the column `pcpId` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `VisitNote` table. All the data in the column will be lost.
  - You are about to drop the `Staff` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Patient" DROP CONSTRAINT "Patient_pcpId_fkey";

-- DropForeignKey
ALTER TABLE "Staff" DROP CONSTRAINT "Staff_userId_fkey";

-- DropForeignKey
ALTER TABLE "VisitNote" DROP CONSTRAINT "VisitNote_authorId_fkey";

-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "pcpId";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "sub" DROP NOT NULL;

-- AlterTable
ALTER TABLE "VisitNote" DROP COLUMN "authorId";

-- DropTable
DROP TABLE "Staff";
