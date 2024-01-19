/*
  Warnings:

  - Added the required column `type` to the `ProjectEnvelopeComponent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProjectEnvelopeComponent" ADD COLUMN     "type" TEXT NOT NULL;
