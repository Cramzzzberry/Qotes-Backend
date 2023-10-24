-- DropForeignKey
ALTER TABLE `auth_tokens` DROP FOREIGN KEY `Auth_Tokens_user_id_fkey`;

-- AddForeignKey
ALTER TABLE `Auth_Tokens` ADD CONSTRAINT `Auth_Tokens_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
