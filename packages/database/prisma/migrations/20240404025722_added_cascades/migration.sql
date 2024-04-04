-- DropForeignKey
ALTER TABLE "Edge" DROP CONSTRAINT "Edge_endNodeId_fkey";

-- DropForeignKey
ALTER TABLE "Edge" DROP CONSTRAINT "Edge_startNodeId_fkey";

-- CreateTable
CREATE TABLE "FlowerRequest" (
    "id" TEXT NOT NULL,
    "nodeId" TEXT,
    "flowerName" TEXT NOT NULL,
    "requestDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "loginName" TEXT NOT NULL,
    "commentOnFlower" TEXT NOT NULL,
    "totalPayment" DOUBLE PRECISION NOT NULL,
    "delivered" BOOLEAN NOT NULL,

    CONSTRAINT "FlowerRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Edge" ADD CONSTRAINT "Edge_startNodeId_fkey" FOREIGN KEY ("startNodeId") REFERENCES "Node"("nodeId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Edge" ADD CONSTRAINT "Edge_endNodeId_fkey" FOREIGN KEY ("endNodeId") REFERENCES "Node"("nodeId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlowerRequest" ADD CONSTRAINT "FlowerRequest_nodeId_fkey" FOREIGN KEY ("nodeId") REFERENCES "Node"("nodeId") ON DELETE SET NULL ON UPDATE CASCADE;
