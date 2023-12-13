-- DropForeignKey
ALTER TABLE "FinancingOption" DROP CONSTRAINT "FinancingOption_organizationId_fkey";

-- AddForeignKey
ALTER TABLE "FinancingOption" ADD CONSTRAINT "FinancingOption_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
