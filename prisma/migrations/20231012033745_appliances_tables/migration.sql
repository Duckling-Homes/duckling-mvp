-- CreateTable
CREATE TABLE "HVAC" (
    "id" TEXT NOT NULL,
    "hvacSystemType" TEXT,
    "havcSystem" TEXT,
    "fuel" TEXT,
    "age" INTEGER,
    "manufacturer" TEXT,
    "modelNumber" TEXT,
    "serialNumber" TEXT,
    "heatingCapacity" INTEGER,
    "coolingCapacity" INTEGER,
    "location" TEXT,
    "notes" TEXT,
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HVAC_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WaterHeater" (
    "id" TEXT NOT NULL,
    "systemType" TEXT,
    "fuel" TEXT,
    "age" INTEGER,
    "manufacturer" TEXT,
    "modelNumber" TEXT,
    "serialNumber" TEXT,
    "tankVolume" INTEGER,
    "location" TEXT,
    "notes" TEXT,
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WaterHeater_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cooktop" (
    "id" TEXT NOT NULL,
    "fuel" TEXT,
    "age" INTEGER,
    "manufacturer" TEXT,
    "modelNumber" TEXT,
    "serialNumber" TEXT,
    "isInduction" BOOLEAN,
    "location" TEXT,
    "notes" TEXT,
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cooktop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OtherAppliance" (
    "id" TEXT NOT NULL,
    "fuel" TEXT,
    "age" INTEGER,
    "manufacturer" TEXT,
    "modelNumber" TEXT,
    "serialNumber" TEXT,
    "location" TEXT,
    "notes" TEXT,
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OtherAppliance_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "HVAC" ADD CONSTRAINT "HVAC_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WaterHeater" ADD CONSTRAINT "WaterHeater_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cooktop" ADD CONSTRAINT "Cooktop_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OtherAppliance" ADD CONSTRAINT "OtherAppliance_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
