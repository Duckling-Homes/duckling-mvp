/*
  Warnings:

  - You are about to drop the column `summary` on the `Plan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Plan" DROP COLUMN "summary",
ADD COLUMN     "copy" JSONB;
