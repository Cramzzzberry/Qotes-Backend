-- DropForeignKey
ALTER TABLE `auth_tokens` DROP FOREIGN KEY `Auth_Tokens_user_email_fkey`;

-- AddForeignKey
ALTER TABLE `Auth_Tokens` ADD CONSTRAINT `Auth_Tokens_user_email_fkey` FOREIGN KEY (`user_email`) REFERENCES `User`(`email`) ON DELETE CASCADE ON UPDATE CASCADE;
