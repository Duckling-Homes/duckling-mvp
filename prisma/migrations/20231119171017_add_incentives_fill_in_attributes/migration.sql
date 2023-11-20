/*
  Warnings:

  - Added the required column `calculationRateValue` to the `Incentive` table without a default value. This is not possible if the table is not empty.
  - Added the required column `calculationType` to the `Incentive` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descriptionText` to the `Incentive` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Incentive` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rebateOrg` to the `Incentive` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Incentive` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RebateOrg" AS ENUM ('FederalGovernment', 'BayREN', 'IRA', 'NYSERDA');

-- CreateEnum
CREATE TYPE "CalculationType" AS ENUM ('Percentage', 'PerUnit', 'FlatRate');

-- CreateEnum
CREATE TYPE "IncentiveType" AS ENUM ('Rebate', 'TaxCredit');

-- AlterTable
ALTER TABLE "Incentive" ADD COLUMN     "calculationRateValue" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "calculationType" "CalculationType" NOT NULL,
ADD COLUMN     "criteria" TEXT,
ADD COLUMN     "descriptionText" TEXT NOT NULL,
ADD COLUMN     "maxLimit" DOUBLE PRECISION,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "rebateOrg" "RebateOrg" NOT NULL,
ADD COLUMN     "type" "IncentiveType" NOT NULL;
