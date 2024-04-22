-- AlterTable
ALTER TABLE "Appointment" ALTER COLUMN "staffId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Visit" ALTER COLUMN "staffId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "VisitNote" ALTER COLUMN "authorId" DROP NOT NULL;
