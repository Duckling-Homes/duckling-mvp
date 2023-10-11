-- CreateTable
CREATE TABLE "ProjectRoom" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "type" TEXT,
    "width" INTEGER,
    "length" INTEGER,
    "ceilingHeight" INTEGER,
    "floor" TEXT,
    "usage" TEXT,
    "comfortIssueTags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "safetyIssueTags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "notes" TEXT,
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProjectRoom_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProjectRoom" ADD CONSTRAINT "ProjectRoom_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
