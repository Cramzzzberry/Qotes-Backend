/*
  Warnings:

  - You are about to drop the column `email` on the `Tokens` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Tokens` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Tokens" DROP CONSTRAINT "Tokens_email_fkey";

-- AlterTable
ALTER TABLE "Tokens" DROP COLUMN "email",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Tokens" ADD CONSTRAINT "Tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
