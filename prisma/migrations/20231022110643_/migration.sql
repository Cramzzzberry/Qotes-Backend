/*
  Warnings:

  - You are about to drop the column `key` on the `auth_tokens` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[token]` on the table `Auth_Tokens` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `token` to the `Auth_Tokens` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Auth_Tokens_key_key` ON `auth_tokens`;

-- AlterTable
ALTER TABLE `auth_tokens` DROP COLUMN `key`,
    ADD COLUMN `token` VARCHAR(32) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Auth_Tokens_token_key` ON `Auth_Tokens`(`token`);
