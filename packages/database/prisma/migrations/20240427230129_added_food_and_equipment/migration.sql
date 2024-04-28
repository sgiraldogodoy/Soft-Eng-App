-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "ServiceType" ADD VALUE 'equipment';
ALTER TYPE "ServiceType" ADD VALUE 'food';

-- CreateTable
CREATE TABLE "Equipment" (
    "id" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "recipientName" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Equipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Food" (
    "id" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "recipientName" TEXT NOT NULL,
    "order" TEXT NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Food_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Equipment_serviceId_key" ON "Equipment"("serviceId");

-- CreateIndex
CREATE UNIQUE INDEX "Food_serviceId_key" ON "Food"("serviceId");

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Food" ADD CONSTRAINT "Food_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
