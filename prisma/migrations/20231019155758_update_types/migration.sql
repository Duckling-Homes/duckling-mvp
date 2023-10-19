/*
  Warnings:

  - The `totalCapacity` column on the `Battery` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `ratedPowerOutput` column on the `Battery` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `ratedPeakOutput` column on the `Battery` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `voltage` column on the `Battery` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `panelAmperageRating` column on the `ElectricalPanel` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `availableNewCircuits` column on the `ElectricalPanel` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `total15AmpCircuits` column on the `ElectricalPanel` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `total20AmpCircuits` column on the `ElectricalPanel` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `total30AmpCircuits` column on the `ElectricalPanel` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `total40AmpCircuits` column on the `ElectricalPanel` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `total50AmpCircuits` column on the `ElectricalPanel` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `total60AmpCircuits` column on the `ElectricalPanel` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `total70AmpCircuits` column on the `ElectricalPanel` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `amperage` column on the `EvCharger` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `acPowerSourceVolatge` column on the `EvCharger` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `maxChargingPower` column on the `EvCharger` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `ratedContinuousWattage` column on the `Generator` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `ratedPeakWattage` column on the `Generator` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `arrayTilt` column on the `Solar` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `maxPowerOutput` column on the `Solar` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `annualOutput` column on the `Solar` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `ProjectOwner` table. If the table is not empty, all the data it contains will be lost.

*/

-- AlterTable
ALTER TABLE "Battery" DROP COLUMN "totalCapacity",
ADD COLUMN     "totalCapacity" INTEGER,
DROP COLUMN "ratedPowerOutput",
ADD COLUMN     "ratedPowerOutput" INTEGER,
DROP COLUMN "ratedPeakOutput",
ADD COLUMN     "ratedPeakOutput" INTEGER,
DROP COLUMN "voltage",
ADD COLUMN     "voltage" INTEGER;

-- AlterTable
ALTER TABLE "ElectricalPanel" ADD COLUMN     "location" TEXT,
DROP COLUMN "panelAmperageRating",
ADD COLUMN     "panelAmperageRating" INTEGER,
DROP COLUMN "availableNewCircuits",
ADD COLUMN     "availableNewCircuits" INTEGER,
DROP COLUMN "total15AmpCircuits",
ADD COLUMN     "total15AmpCircuits" INTEGER,
DROP COLUMN "total20AmpCircuits",
ADD COLUMN     "total20AmpCircuits" INTEGER,
DROP COLUMN "total30AmpCircuits",
ADD COLUMN     "total30AmpCircuits" INTEGER,
DROP COLUMN "total40AmpCircuits",
ADD COLUMN     "total40AmpCircuits" INTEGER,
DROP COLUMN "total50AmpCircuits",
ADD COLUMN     "total50AmpCircuits" INTEGER,
DROP COLUMN "total60AmpCircuits",
ADD COLUMN     "total60AmpCircuits" INTEGER,
DROP COLUMN "total70AmpCircuits",
ADD COLUMN     "total70AmpCircuits" INTEGER;

-- AlterTable
ALTER TABLE "EvCharger" DROP COLUMN "amperage",
ADD COLUMN     "amperage" INTEGER,
DROP COLUMN "acPowerSourceVolatge",
ADD COLUMN     "acPowerSourceVolatge" INTEGER,
DROP COLUMN "maxChargingPower",
ADD COLUMN     "maxChargingPower" INTEGER;

-- AlterTable
ALTER TABLE "Generator" DROP COLUMN "ratedContinuousWattage",
ADD COLUMN     "ratedContinuousWattage" INTEGER,
DROP COLUMN "ratedPeakWattage",
ADD COLUMN     "ratedPeakWattage" INTEGER,
ALTER COLUMN "numberOfPhases" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Solar" DROP COLUMN "arrayTilt",
ADD COLUMN     "arrayTilt" INTEGER,
DROP COLUMN "maxPowerOutput",
ADD COLUMN     "maxPowerOutput" INTEGER,
DROP COLUMN "annualOutput",
ADD COLUMN     "annualOutput" INTEGER;
