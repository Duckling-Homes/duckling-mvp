/*
  Warnings:

  - You are about to drop the column `ceilingHeight` on the `ProjectRoom` table. All the data in the column will be lost.
  - You are about to drop the column `length` on the `ProjectRoom` table. All the data in the column will be lost.
  - You are about to drop the column `usage` on the `ProjectRoom` table. All the data in the column will be lost.
  - You are about to drop the column `width` on the `ProjectRoom` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProjectRoom" DROP COLUMN "ceilingHeight",
DROP COLUMN "length",
DROP COLUMN "usage",
DROP COLUMN "width";
