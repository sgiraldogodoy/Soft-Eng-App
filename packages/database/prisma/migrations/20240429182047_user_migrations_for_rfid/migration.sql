-- AlterTable
ALTER TABLE "User" ADD COLUMN     "locked" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Rfid" (
    "hash" TEXT NOT NULL,
    "userId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Rfid_userId_key" ON "Rfid"("userId");

-- AddForeignKey
ALTER TABLE "Rfid" ADD CONSTRAINT "Rfid_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
