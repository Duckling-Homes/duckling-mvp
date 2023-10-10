-- CreateTable
CREATE TABLE "ProjectData" (
    "id" TEXT NOT NULL,
    "squareFootage" INTEGER,
    "roomCount" INTEGER,
    "bathroomCount" INTEGER,
    "bedroomCount" INTEGER,
    "stories" INTEGER,
    "yearBuilt" INTEGER,
    "basementType" TEXT,
    "comfortIssueTags" TEXT,
    "comfortIssueNotes" TEXT,
    "healthSafetyIssueTags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "healthSafetyIssueNotes" TEXT,
    "homeownerGoalsTags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "homeownerGoalsNotes" TEXT,
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProjectData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProjectData_projectId_key" ON "ProjectData"("projectId");

-- AddForeignKey
ALTER TABLE "ProjectData" ADD CONSTRAINT "ProjectData_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
