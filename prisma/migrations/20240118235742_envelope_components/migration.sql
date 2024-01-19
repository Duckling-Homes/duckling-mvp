-- CreateTable
CREATE TABLE "ProjectEnvelopeComponent" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "condition" TEXT,
    "location" TEXT,
    "insulationCondition" TEXT,
    "airSealingCondition" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProjectEnvelopeComponent_pkey" PRIMARY KEY ("id")
);
