-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_heroImageId_fkey";

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "heroImageId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_heroImageId_fkey" FOREIGN KEY ("heroImageId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;
