-- AlterEnum
ALTER TYPE "RebateOrg" ADD VALUE 'Other';

-- AlterTable
ALTER TABLE "Incentive" ALTER COLUMN "rebateOrg" DROP NOT NULL;
