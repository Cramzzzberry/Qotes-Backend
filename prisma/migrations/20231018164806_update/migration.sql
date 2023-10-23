/*
  Warnings:

  - Made the column `song_title` on table `sheets` required. This step will fail if there are existing NULL values in that column.
  - Made the column `song_key` on table `sheets` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `sheets` MODIFY `song_title` VARCHAR(191) NOT NULL,
    MODIFY `song_key` VARCHAR(1) NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `email` VARCHAR(191) NOT NULL,
    MODIFY `password` VARCHAR(191) NOT NULL,
    MODIFY `profile_pic` LONGBLOB NULL,
    MODIFY `first_name` VARCHAR(191) NULL,
    MODIFY `last_name` VARCHAR(191) NULL,
    MODIFY `approved` BOOLEAN NOT NULL DEFAULT false;
