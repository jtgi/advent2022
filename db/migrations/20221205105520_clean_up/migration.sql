/*
  Warnings:

  - You are about to drop the column `gm` on the `Day` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Day" DROP COLUMN "gm",
ADD COLUMN     "day" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "date" DROP NOT NULL;
