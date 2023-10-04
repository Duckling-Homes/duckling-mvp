-- CreateTable
CREATE TABLE "ProjectData" (
    "id" TEXT NOT NULL,
    "squareFootage" INTEGER NOT NULL,
    "roomCount" INTEGER NOT NULL,
    "bathroomCount" INTEGER NOT NULL,
    "bedroomCount" INTEGER NOT NULL,
    "stories" INTEGER NOT NULL,
    "yearBuilt" INTEGER NOT NULL,
    "basementType" TEXT NOT NULL,
    "comfortIssueTags" TEXT NOT NULL,
    "comfortIssueNotes" TEXT NOT NULL,
    "healthSafetyIssueTags" TEXT[],
    "healthSafetyIssueNotes" TEXT NOT NULL,
    "homeownerGoalsTags" TEXT[],
    "homeownerGoalsNotes" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProjectData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectEnvelope" (
    "id" TEXT NOT NULL,
    "envelopType" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProjectEnvelope_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectInsulation" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "insulationLocation" TEXT NOT NULL,
    "insulationCondition" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "envelopeId" TEXT NOT NULL,
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
    "envelopeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProjectAirSealing_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProjectData" ADD CONSTRAINT "ProjectData_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectEnvelope" ADD CONSTRAINT "ProjectEnvelope_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectInsulation" ADD CONSTRAINT "ProjectInsulation_envelopeId_fkey" FOREIGN KEY ("envelopeId") REFERENCES "ProjectEnvelope"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectAirSealing" ADD CONSTRAINT "ProjectAirSealing_envelopeId_fkey" FOREIGN KEY ("envelopeId") REFERENCES "ProjectEnvelope"("id") ON DELETE CASCADE ON UPDATE CASCADE;
