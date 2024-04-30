/*
  Warnings:

  - You are about to drop the column `visitId` on the `Appointment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[appointmentId]` on the table `Visit` will be added. If there are existing duplicate values, this will fail.
  - Made the column `authorId` on table `Record` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `appointmentId` to the `Visit` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_visitId_fkey";

-- DropIndex
DROP INDEX "Appointment_visitId_key";

-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "visitId";

-- AlterTable
ALTER TABLE "Record" ADD COLUMN     "creationTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "authorId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Visit" ADD COLUMN     "appointmentId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Visit_appointmentId_key" ON "Visit"("appointmentId");

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
