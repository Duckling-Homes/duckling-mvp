-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "duplicatedFromId" TEXT;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_duplicatedFromId_fkey" FOREIGN KEY ("duplicatedFromId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;
