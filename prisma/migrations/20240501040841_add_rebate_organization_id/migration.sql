-- AlterTable
ALTER TABLE "Incentive" ADD COLUMN     "rebateOrganizationId" TEXT;

-- CreateTable
CREATE TABLE "RebateOrganization" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RebateOrganization_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Incentive" ADD CONSTRAINT "Incentive_rebateOrganizationId_fkey" FOREIGN KEY ("rebateOrganizationId") REFERENCES "RebateOrganization"("id") ON DELETE SET NULL ON UPDATE CASCADE;
