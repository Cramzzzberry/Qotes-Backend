/*
  Warnings:

  - Made the column `content` on table `Sheets` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Sheets" ALTER COLUMN "content" SET NOT NULL,
ALTER COLUMN "content" SET DEFAULT '>> Song Section (Ex. Chorus)
C D E F G A B
Sample Lyrics G#m CmM7';
