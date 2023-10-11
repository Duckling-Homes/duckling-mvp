-- AlterTable
ALTER TABLE "ProjectAirSealing" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "leakinessDescription" DROP NOT NULL,
ALTER COLUMN "notes" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ProjectInsulation" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "insulationLocation" DROP NOT NULL,
ALTER COLUMN "insulationCondition" DROP NOT NULL,
ALTER COLUMN "notes" DROP NOT NULL;
