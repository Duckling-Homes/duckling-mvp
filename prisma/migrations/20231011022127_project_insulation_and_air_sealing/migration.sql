-- CreateTable
CREATE TABLE "ProjectInsulation" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "insulationLocation" TEXT NOT NULL,
    "insulationCondition" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProjectInsulation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectAirSealing" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "leakinessDescription" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProjectAirSealing_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProjectInsulation" ADD CONSTRAINT "ProjectInsulation_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectAirSealing" ADD CONSTRAINT "ProjectAirSealing_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
