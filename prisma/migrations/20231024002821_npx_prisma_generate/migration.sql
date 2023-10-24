-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "photo_name" TEXT NOT NULL,
    "homeowner_notes" TEXT,
    "internal_notes" TEXT,
    "associated_entity_id" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
