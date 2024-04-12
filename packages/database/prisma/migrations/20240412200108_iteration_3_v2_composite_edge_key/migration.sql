/*
  Warnings:

  - The primary key for the `Edge` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Edge` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Edge" DROP CONSTRAINT "Edge_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Edge_pkey" PRIMARY KEY ("startNodeId", "endNodeId");
