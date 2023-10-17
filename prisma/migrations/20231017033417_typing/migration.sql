/*
  Warnings:

  - The `numberOfPanels` column on the `Solar` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `yearInstalled` column on the `Solar` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Solar" DROP COLUMN "numberOfPanels",
ADD COLUMN     "numberOfPanels" INTEGER,
DROP COLUMN "yearInstalled",
ADD COLUMN     "yearInstalled" INTEGER;
