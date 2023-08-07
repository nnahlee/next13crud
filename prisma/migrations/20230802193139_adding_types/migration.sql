-- AlterTable
ALTER TABLE "User" ADD COLUMN     "preferences" JSONB;

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "rating" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3),

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);
