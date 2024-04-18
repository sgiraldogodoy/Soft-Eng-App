-- CreateTable
CREATE TABLE "Patient" (
    "id" TEXT NOT NULL,
    "SSN" INTEGER,
    "nodeId" TEXT NOT NULL DEFAULT 'BINFO00202',
    "doctor" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT,
    "lastName" TEXT NOT NULL,
    "inTreatment" BOOLEAN NOT NULL DEFAULT true,
    "insurance" TEXT,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Patient_SSN_key" ON "Patient"("SSN");

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_nodeId_fkey" FOREIGN KEY ("nodeId") REFERENCES "Node"("id") ON DELETE SET DEFAULT ON UPDATE SET DEFAULT;
