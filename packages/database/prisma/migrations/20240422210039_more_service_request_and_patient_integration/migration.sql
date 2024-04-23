-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "ServiceType" ADD VALUE 'maintenance';
ALTER TYPE "ServiceType" ADD VALUE 'transport';
ALTER TYPE "ServiceType" ADD VALUE 'sanitation';
ALTER TYPE "ServiceType" ADD VALUE 'visitor';
ALTER TYPE "ServiceType" ADD VALUE 'it';
ALTER TYPE "ServiceType" ADD VALUE 'religious';
ALTER TYPE "ServiceType" ADD VALUE 'interpreter';

-- AlterTable
ALTER TABLE "Appointment" ALTER COLUMN "staffId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Visit" ALTER COLUMN "staffId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "VisitNote" ALTER COLUMN "authorId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Maintenance" (
    "id" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3),

    CONSTRAINT "Maintenance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transport" (
    "id" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "count" TEXT NOT NULL,

    CONSTRAINT "Transport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sanitation" (
    "id" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "quality" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3),

    CONSTRAINT "Sanitation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Visitor" (
    "id" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "visitorName" TEXT NOT NULL,
    "patientName" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3),

    CONSTRAINT "Visitor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IT" (
    "id" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "errorCodes" TEXT,

    CONSTRAINT "IT_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Religious" (
    "id" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "religion" TEXT NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Religious_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Interpreter" (
    "id" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "recipientName" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Interpreter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Maintenance_serviceId_key" ON "Maintenance"("serviceId");

-- CreateIndex
CREATE UNIQUE INDEX "Transport_serviceId_key" ON "Transport"("serviceId");

-- CreateIndex
CREATE UNIQUE INDEX "Sanitation_serviceId_key" ON "Sanitation"("serviceId");

-- CreateIndex
CREATE UNIQUE INDEX "Visitor_serviceId_key" ON "Visitor"("serviceId");

-- CreateIndex
CREATE UNIQUE INDEX "IT_serviceId_key" ON "IT"("serviceId");

-- CreateIndex
CREATE UNIQUE INDEX "Religious_serviceId_key" ON "Religious"("serviceId");

-- CreateIndex
CREATE UNIQUE INDEX "Interpreter_serviceId_key" ON "Interpreter"("serviceId");

-- AddForeignKey
ALTER TABLE "Maintenance" ADD CONSTRAINT "Maintenance_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transport" ADD CONSTRAINT "Transport_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sanitation" ADD CONSTRAINT "Sanitation_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visitor" ADD CONSTRAINT "Visitor_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IT" ADD CONSTRAINT "IT_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Religious" ADD CONSTRAINT "Religious_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interpreter" ADD CONSTRAINT "Interpreter_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
