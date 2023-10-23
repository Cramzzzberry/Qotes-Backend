/*
  Warnings:

  - You are about to drop the `authtokens` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `authtokens` DROP FOREIGN KEY `AuthTokens_user_id_fkey`;

-- DropTable
DROP TABLE `authtokens`;

-- CreateTable
CREATE TABLE `Auth_Tokens` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `key` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Auth_Tokens_key_key`(`key`),
    UNIQUE INDEX `Auth_Tokens_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Auth_Tokens` ADD CONSTRAINT `Auth_Tokens_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
