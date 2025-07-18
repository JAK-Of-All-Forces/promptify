/*
  Warnings:

  - The primary key for the `TracksOnPlaylists` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `image_url` to the `Playlist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_url` to the `Track` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `TracksOnPlaylists` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Playlist" ADD COLUMN     "image_url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Track" ADD COLUMN     "image_url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TracksOnPlaylists" DROP CONSTRAINT "TracksOnPlaylists_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "TracksOnPlaylists_pkey" PRIMARY KEY ("id");
