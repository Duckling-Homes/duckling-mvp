/*
  Warnings:

  - Added the required column `homeownerAddress` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "homeownerAddress" TEXT NOT NULL;
