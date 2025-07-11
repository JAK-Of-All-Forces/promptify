/*
  Warnings:

  - You are about to drop the column `playlistId` on the `Track` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Track" DROP CONSTRAINT "Track_playlistId_fkey";

-- AlterTable
ALTER TABLE "Playlist" ALTER COLUMN "bpmLow" DROP NOT NULL,
ALTER COLUMN "bpmHigh" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Track" DROP COLUMN "playlistId";

-- CreateTable
CREATE TABLE "TracksOnPlaylists" (
    "playlistId" TEXT NOT NULL,
    "trackId" TEXT NOT NULL,

    CONSTRAINT "TracksOnPlaylists_pkey" PRIMARY KEY ("playlistId","trackId")
);

-- AddForeignKey
ALTER TABLE "TracksOnPlaylists" ADD CONSTRAINT "TracksOnPlaylists_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TracksOnPlaylists" ADD CONSTRAINT "TracksOnPlaylists_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
