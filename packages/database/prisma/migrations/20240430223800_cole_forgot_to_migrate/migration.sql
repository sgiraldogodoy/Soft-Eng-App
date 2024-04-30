/*
  Warnings:

  - The primary key for the `Identity` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `Identity` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Identity" DROP CONSTRAINT "Identity_pkey",
ADD CONSTRAINT "Identity_pkey" PRIMARY KEY ("idType", "idNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Identity_id_key" ON "Identity"("id");
