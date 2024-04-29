/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sex` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "sex" AS ENUM ('male', 'female', 'other');

-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "bloodType" TEXT,
ADD COLUMN     "height" DOUBLE PRECISION,
ADD COLUMN     "sex" "sex" NOT NULL,
ADD COLUMN     "weight" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" SET NOT NULL;

-- AlterTable
ALTER TABLE "VisitNote" ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
