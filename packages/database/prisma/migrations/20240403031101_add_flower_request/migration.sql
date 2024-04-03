-- CreateTable
CREATE TABLE "FlowerRequest" (
    "id" TEXT NOT NULL,
    "nodeId" TEXT NOT NULL,
    "flowerName" TEXT NOT NULL,
    "requestDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "loginName" TEXT NOT NULL,
    "commentOnFlower" TEXT NOT NULL,
    "totalPayment" DOUBLE PRECISION NOT NULL,
    "delivered" BOOLEAN NOT NULL,

    CONSTRAINT "FlowerRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FlowerRequest" ADD CONSTRAINT "FlowerRequest_nodeId_fkey" FOREIGN KEY ("nodeId") REFERENCES "Node"("nodeId") ON DELETE RESTRICT ON UPDATE CASCADE;
