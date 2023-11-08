-- CreateEnum
CREATE TYPE "Category" AS ENUM ('HomePerformance', 'HVAC', 'Appliances', 'Electrical');

-- CreateEnum
CREATE TYPE "CatalogEntryType" AS ENUM ('Equipment', 'Service', 'Other');

-- CreateEnum
CREATE TYPE "PricingType" AS ENUM ('PerUnit', 'ScaledPricing');

-- CreateTable
CREATE TABLE "ProductCatalogue" (
    "id" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "subcategory" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "type" "CatalogEntryType" NOT NULL,
    "pricingType" "PricingType" NOT NULL DEFAULT 'PerUnit',
    "scaledPricingMetric" TEXT,
    "basePricePer" DOUBLE PRECISION NOT NULL,
    "brand" TEXT,
    "modelNumber" TEXT,
    "ahriNumber" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductCatalogue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Incentive" (
    "id" TEXT NOT NULL,
    "productCatalogueId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Incentive_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Incentive" ADD CONSTRAINT "Incentive_productCatalogueId_fkey" FOREIGN KEY ("productCatalogueId") REFERENCES "ProductCatalogue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
