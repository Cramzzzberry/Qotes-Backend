/*
  Warnings:

  - The primary key for the `auth_tokens` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `auth_tokens` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `auth_tokens` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`user_id`);
