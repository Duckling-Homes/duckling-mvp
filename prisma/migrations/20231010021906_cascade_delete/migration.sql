/*
  Warnings:

  - The `comfortIssueTags` column on the `ProjectData` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "ProjectData" DROP CONSTRAINT "ProjectData_projectId_fkey";

-- AlterTable
ALTER TABLE "ProjectData" DROP COLUMN "comfortIssueTags",
ADD COLUMN     "comfortIssueTags" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AddForeignKey
ALTER TABLE "ProjectData" ADD CONSTRAINT "ProjectData_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
