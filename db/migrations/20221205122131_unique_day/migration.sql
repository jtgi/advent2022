/*
  Warnings:

  - A unique constraint covering the columns `[day]` on the table `Day` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Day_day_key" ON "Day"("day");
