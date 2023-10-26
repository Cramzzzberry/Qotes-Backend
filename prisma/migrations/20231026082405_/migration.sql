/*
  Warnings:

  - You are about to drop the `auth_tokens` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `auth_tokens` DROP FOREIGN KEY `Auth_Tokens_user_email_fkey`;

-- DropTable
DROP TABLE `auth_tokens`;
