/*
  Warnings:

  - You are about to drop the column `productCatalogueId` on the `Incentive` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Incentive" DROP CONSTRAINT "Incentive_productCatalogueId_fkey";

-- AlterTable
ALTER TABLE "Incentive" DROP COLUMN "productCatalogueId";

-- CreateTable
CREATE TABLE "_ProductCatalogueToIncentive" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProductCatalogueToIncentive_AB_unique" ON "_ProductCatalogueToIncentive"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductCatalogueToIncentive_B_index" ON "_ProductCatalogueToIncentive"("B");

-- AddForeignKey
ALTER TABLE "_ProductCatalogueToIncentive" ADD CONSTRAINT "_ProductCatalogueToIncentive_A_fkey" FOREIGN KEY ("A") REFERENCES "Incentive"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductCatalogueToIncentive" ADD CONSTRAINT "_ProductCatalogueToIncentive_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductCatalogue"("id") ON DELETE CASCADE ON UPDATE CASCADE;
