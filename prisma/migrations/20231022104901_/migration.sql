/*
  Warnings:

  - You are about to alter the column `key` on the `auth_tokens` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Char(32)`.

*/
-- AlterTable
ALTER TABLE `auth_tokens` MODIFY `key` CHAR(32) NOT NULL;
