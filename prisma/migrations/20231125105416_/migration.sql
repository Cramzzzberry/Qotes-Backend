/*
  Warnings:

  - You are about to drop the column `userId` on the `Tokens` table. All the data in the column will be lost.
  - Added the required column `email` to the `Tokens` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Tokens" DROP CONSTRAINT "Tokens_userId_fkey";

-- AlterTable
ALTER TABLE "Tokens" DROP COLUMN "userId",
ADD COLUMN     "email" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Tokens" ADD CONSTRAINT "Tokens_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;
