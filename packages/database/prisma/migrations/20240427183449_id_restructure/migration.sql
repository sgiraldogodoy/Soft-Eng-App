/*
  Warnings:

  - You are about to drop the column `SSN` on the `Patient` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[idNumber]` on the table `Patient` will be added. If there are existing duplicate values, this will fail.
  - The required column `idNumber` was added to the `Patient` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- CreateEnum
CREATE TYPE "IDTypes" AS ENUM ('ssn', 'passport', 'driverLicense');

-- DropIndex
DROP INDEX "Patient_SSN_key";

-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "SSN",
ADD COLUMN     "idNumber" TEXT NOT NULL,
ADD COLUMN     "notes" TEXT;

-- CreateTable
CREATE TABLE "Identity" (
    "id" TEXT NOT NULL,
    "idType" "IDTypes" NOT NULL,
    "idNumber" TEXT NOT NULL,

    CONSTRAINT "Identity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Identity_idNumber_key" ON "Identity"("idNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_idNumber_key" ON "Patient"("idNumber");

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_idNumber_fkey" FOREIGN KEY ("idNumber") REFERENCES "Identity"("idNumber") ON DELETE CASCADE ON UPDATE CASCADE;
