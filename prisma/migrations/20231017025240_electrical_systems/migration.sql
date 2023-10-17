-- CreateTable
CREATE TABLE "ElectricalPanel" (
    "id" TEXT NOT NULL,
    "panelType" TEXT,
    "panelAmperageRating" TEXT,
    "availableNewCircuits" TEXT,
    "total15AmpCircuits" TEXT,
    "total20AmpCircuits" TEXT,
    "total30AmpCircuits" TEXT,
    "total40AmpCircuits" TEXT,
    "total50AmpCircuits" TEXT,
    "total60AmpCircuits" TEXT,
    "total70AmpCircuits" TEXT,
    "notes" TEXT,
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ElectricalPanel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Solar" (
    "id" TEXT NOT NULL,
    "location" TEXT,
    "ownership" TEXT,
    "moduleType" TEXT,
    "tracking" TEXT,
    "arrayOrientation" TEXT,
    "arrayTilt" TEXT,
    "maxPowerOutput" TEXT,
    "numberOfPanels" TEXT,
    "yearInstalled" TEXT,
    "annualOutput" TEXT,
    "notes" TEXT,
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Solar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Battery" (
    "id" TEXT NOT NULL,
    "totalCapacity" TEXT,
    "ratedPowerOutput" TEXT,
    "ratedPeakOutput" TEXT,
    "voltage" TEXT,
    "gridConnected" TEXT,
    "manufacturer" TEXT,
    "modelNumber" TEXT,
    "serialNumber" TEXT,
    "notes" TEXT,
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Battery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EvCharger" (
    "id" TEXT NOT NULL,
    "chargingLevel" TEXT,
    "amperage" TEXT,
    "acPowerSourceVolatge" TEXT,
    "maxChargingPower" TEXT,
    "manufacturer" TEXT,
    "modelNumber" TEXT,
    "serialNumber" TEXT,
    "notes" TEXT,
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EvCharger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Generator" (
    "id" TEXT NOT NULL,
    "generatorType" TEXT,
    "fuelType" TEXT,
    "ratedContinuousWattage" TEXT,
    "ratedPeakWattage" TEXT,
    "voltage" INTEGER,
    "numberOfPhases" INTEGER,
    "transferSwitch" TEXT,
    "connection" TEXT,
    "yearInstalled" INTEGER,
    "manufacturer" TEXT,
    "modelNumber" TEXT,
    "serialNumber" TEXT,
    "location" TEXT,
    "notes" TEXT,
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Generator_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ElectricalPanel" ADD CONSTRAINT "ElectricalPanel_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Solar" ADD CONSTRAINT "Solar_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Battery" ADD CONSTRAINT "Battery_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvCharger" ADD CONSTRAINT "EvCharger_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Generator" ADD CONSTRAINT "Generator_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
