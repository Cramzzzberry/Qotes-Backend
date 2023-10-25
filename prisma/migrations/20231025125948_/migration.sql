/*
  Warnings:

  - You are about to drop the column `user_id` on the `auth_tokens` table. All the data in the column will be lost.
  - Added the required column `user_email` to the `Auth_Tokens` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `auth_tokens` DROP FOREIGN KEY `Auth_Tokens_user_id_fkey`;

-- AlterTable
ALTER TABLE `auth_tokens` DROP COLUMN `user_id`,
    ADD COLUMN `user_email` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Auth_Tokens` ADD CONSTRAINT `Auth_Tokens_user_email_fkey` FOREIGN KEY (`user_email`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
