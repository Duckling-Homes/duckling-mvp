-- CreateEnum
CREATE TYPE "PlanStatus" AS ENUM ('Draft', 'Approved');

-- AlterTable
ALTER TABLE "Plan" ADD COLUMN     "approvedAt" TIMESTAMP(3),
ADD COLUMN     "signature" JSONB,
ADD COLUMN     "status" "PlanStatus" NOT NULL DEFAULT 'Draft';
