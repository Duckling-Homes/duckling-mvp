-- CreateTable
CREATE TABLE "ComfortTag" (
    "name" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "HealthAndSafetyTag" (
    "name" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "GoalTag" (
    "name" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ComfortTag_name_key" ON "ComfortTag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "HealthAndSafetyTag_name_key" ON "HealthAndSafetyTag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "GoalTag_name_key" ON "GoalTag"("name");

-- AddForeignKey
ALTER TABLE "ComfortTag" ADD CONSTRAINT "ComfortTag_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthAndSafetyTag" ADD CONSTRAINT "HealthAndSafetyTag_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoalTag" ADD CONSTRAINT "GoalTag_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
