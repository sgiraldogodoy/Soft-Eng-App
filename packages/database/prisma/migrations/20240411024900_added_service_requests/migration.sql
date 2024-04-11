/*
  Warnings:

  - The primary key for the `Edge` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `edgeId` on the `Edge` table. All the data in the column will be lost.
  - The primary key for the `Node` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `nodeId` on the `Node` table. All the data in the column will be lost.
  - You are about to drop the column `nodeType` on the `Node` table. All the data in the column will be lost.
  - You are about to drop the column `xcords` on the `Node` table. All the data in the column will be lost.
  - You are about to drop the column `ycords` on the `Node` table. All the data in the column will be lost.
  - You are about to drop the `FlowerRequest` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id` to the `Edge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Node` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Node` table without a default value. This is not possible if the table is not empty.
  - Added the required column `x` to the `Node` table without a default value. This is not possible if the table is not empty.
  - Added the required column `y` to the `Node` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Edge" DROP CONSTRAINT "Edge_endNodeId_fkey";

-- DropForeignKey
ALTER TABLE "Edge" DROP CONSTRAINT "Edge_startNodeId_fkey";

-- DropForeignKey
ALTER TABLE "FlowerRequest" DROP CONSTRAINT "FlowerRequest_nodeId_fkey";

-- AlterTable
ALTER TABLE "Edge" DROP CONSTRAINT "Edge_pkey",
DROP COLUMN "edgeId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Edge_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Node" DROP CONSTRAINT "Node_pkey",
DROP COLUMN "nodeId",
DROP COLUMN "nodeType",
DROP COLUMN "xcords",
DROP COLUMN "ycords",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "x" INTEGER NOT NULL,
ADD COLUMN     "y" INTEGER NOT NULL,
ADD CONSTRAINT "Node_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "FlowerRequest";

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "nodeId" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "login" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "note" TEXT NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Flower" (
    "id" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "flower" TEXT NOT NULL,
    "recipientName" TEXT NOT NULL,

    CONSTRAINT "Flower_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gift" (
    "id" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "recipientName" TEXT NOT NULL,
    "wrapping" BOOLEAN NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "Gift_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "checkIn" TIMESTAMP(3) NOT NULL,
    "checkOut" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Security" (
    "id" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL,
    "threat" TEXT NOT NULL,

    CONSTRAINT "Security_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AV" (
    "id" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "AV_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Flower_serviceId_key" ON "Flower"("serviceId");

-- CreateIndex
CREATE UNIQUE INDEX "Gift_serviceId_key" ON "Gift"("serviceId");

-- CreateIndex
CREATE UNIQUE INDEX "Room_serviceId_key" ON "Room"("serviceId");

-- CreateIndex
CREATE UNIQUE INDEX "Security_serviceId_key" ON "Security"("serviceId");

-- CreateIndex
CREATE UNIQUE INDEX "AV_serviceId_key" ON "AV"("serviceId");

-- AddForeignKey
ALTER TABLE "Edge" ADD CONSTRAINT "Edge_startNodeId_fkey" FOREIGN KEY ("startNodeId") REFERENCES "Node"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Edge" ADD CONSTRAINT "Edge_endNodeId_fkey" FOREIGN KEY ("endNodeId") REFERENCES "Node"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_nodeId_fkey" FOREIGN KEY ("nodeId") REFERENCES "Node"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flower" ADD CONSTRAINT "Flower_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gift" ADD CONSTRAINT "Gift_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Security" ADD CONSTRAINT "Security_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AV" ADD CONSTRAINT "AV_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
