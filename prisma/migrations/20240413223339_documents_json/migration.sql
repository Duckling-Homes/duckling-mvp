/*
  Warnings:

  - You are about to drop the `OrganizationDocument` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OrganizationDocument" DROP CONSTRAINT "OrganizationDocument_organizationId_fkey";

-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "documents" JSONB;

-- DropTable
DROP TABLE "OrganizationDocument";
