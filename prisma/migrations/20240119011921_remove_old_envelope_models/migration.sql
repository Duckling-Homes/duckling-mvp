/*
  Warnings:

  - You are about to drop the `ProjectAirSealing` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProjectInsulation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProjectAirSealing" DROP CONSTRAINT "ProjectAirSealing_projectId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectInsulation" DROP CONSTRAINT "ProjectInsulation_projectId_fkey";

-- DropTable
DROP TABLE "ProjectAirSealing";

-- DropTable
DROP TABLE "ProjectInsulation";
