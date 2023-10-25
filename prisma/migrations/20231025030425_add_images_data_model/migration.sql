/*
  Warnings:

  - A unique constraint covering the columns `[heroImageId]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `heroImageId` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "heroImageId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "homeownerNotes" TEXT,
    "internalNotes" TEXT,
    "roomId" TEXT,
    "envelopeId" TEXT,
    "applianceId" TEXT,
    "electricalId" TEXT,
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_heroImageId_key" ON "Project"("heroImageId");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_heroImageId_fkey" FOREIGN KEY ("heroImageId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
