-- CreateTable
CREATE TABLE "public"."UserStats" (
    "userId" TEXT NOT NULL,
    "topTracks" JSONB NOT NULL,
    "topAlbums" JSONB NOT NULL,
    "topArtists" JSONB NOT NULL,
    "topGenres" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserStats_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserStats_userId_key" ON "public"."UserStats"("userId");

-- AddForeignKey
ALTER TABLE "public"."UserStats" ADD CONSTRAINT "UserStats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
