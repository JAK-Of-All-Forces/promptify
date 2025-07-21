/*
  Warnings:

  - Added the required column `image_url` to the `Playlist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_url` to the `Track` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Playlist" ADD COLUMN     "image_url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Track" ADD COLUMN     "image_url" TEXT NOT NULL;
