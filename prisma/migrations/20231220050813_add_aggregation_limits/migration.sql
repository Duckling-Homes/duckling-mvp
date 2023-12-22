-- CreateTable
CREATE TABLE "AggregationLimit" (
    "id" TEXT NOT NULL,
    "limitName" TEXT NOT NULL,
    "limitDescription" TEXT,
    "limitWarning" TEXT NOT NULL,
    "limitAmount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AggregationLimit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AggregationLimitToIncentive" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AggregationLimitToIncentive_AB_unique" ON "_AggregationLimitToIncentive"("A", "B");

-- CreateIndex
CREATE INDEX "_AggregationLimitToIncentive_B_index" ON "_AggregationLimitToIncentive"("B");

-- AddForeignKey
ALTER TABLE "_AggregationLimitToIncentive" ADD CONSTRAINT "_AggregationLimitToIncentive_A_fkey" FOREIGN KEY ("A") REFERENCES "AggregationLimit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AggregationLimitToIncentive" ADD CONSTRAINT "_AggregationLimitToIncentive_B_fkey" FOREIGN KEY ("B") REFERENCES "Incentive"("id") ON DELETE CASCADE ON UPDATE CASCADE;
