/*
  Warnings:

  - You are about to drop the column `song_writter` on the `sheets` table. All the data in the column will be lost.
  - Added the required column `song_writer` to the `Sheets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `sheets` DROP COLUMN `song_writter`,
    ADD COLUMN `song_writer` VARCHAR(191) NOT NULL;
