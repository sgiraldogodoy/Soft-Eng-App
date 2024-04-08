-- CreateTable
CREATE TABLE "Node" (
    "nodeId" TEXT NOT NULL,
    "xcords" DOUBLE PRECISION NOT NULL,
    "ycords" DOUBLE PRECISION NOT NULL,
    "building" TEXT NOT NULL,
    "floor" TEXT NOT NULL,
    "nodeType" TEXT NOT NULL,
    "longName" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,

    CONSTRAINT "Node_pkey" PRIMARY KEY ("nodeId")
);

-- CreateTable
CREATE TABLE "Edge" (
    "edgeId" TEXT NOT NULL,
    "startNodeId" TEXT NOT NULL,
    "endNodeId" TEXT NOT NULL,

    CONSTRAINT "Edge_pkey" PRIMARY KEY ("edgeId")
);

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
