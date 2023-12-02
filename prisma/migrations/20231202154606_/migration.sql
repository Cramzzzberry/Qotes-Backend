/*
  Warnings:

  - You are about to drop the column `pinned` on the `Sheets` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Sheets" DROP COLUMN "pinned",
ADD COLUMN     "lineup" BOOLEAN NOT NULL DEFAULT false;
