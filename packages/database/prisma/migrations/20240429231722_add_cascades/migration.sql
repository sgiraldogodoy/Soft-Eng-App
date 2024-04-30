-- DropForeignKey
ALTER TABLE "Rfid" DROP CONSTRAINT "Rfid_userId_fkey";

-- AddForeignKey
ALTER TABLE "Rfid" ADD CONSTRAINT "Rfid_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
