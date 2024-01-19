/*
  Warnings:

  - Added the required column `projectId` to the `ProjectEnvelopeComponent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProjectEnvelopeComponent" ADD COLUMN     "projectId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ProjectEnvelopeComponent" ADD CONSTRAINT "ProjectEnvelopeComponent_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
