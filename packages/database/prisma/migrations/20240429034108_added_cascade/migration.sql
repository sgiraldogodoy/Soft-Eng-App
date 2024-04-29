-- DropForeignKey
ALTER TABLE "Prescription" DROP CONSTRAINT "Prescription_diagnosisId_fkey";

-- AddForeignKey
ALTER TABLE "Prescription" ADD CONSTRAINT "Prescription_diagnosisId_fkey" FOREIGN KEY ("diagnosisId") REFERENCES "Diagnosis"("id") ON DELETE CASCADE ON UPDATE CASCADE;
