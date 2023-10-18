/*
  Warnings:

  - Added the required column `type` to the `OtherAppliance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OtherAppliance" ADD COLUMN     "type" TEXT NOT NULL;
