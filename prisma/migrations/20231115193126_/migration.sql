/*
  Warnings:

  - You are about to drop the column `song_writer` on the `sheets` table. All the data in the column will be lost.
  - Added the required column `artist` to the `Sheets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `sheets` DROP COLUMN `song_writer`,
    ADD COLUMN `artist` VARCHAR(191) NOT NULL;
