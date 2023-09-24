-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "homeownerName" TEXT NOT NULL,
    "homeownerPhone" TEXT NOT NULL,
    "homeownerEmail" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);
