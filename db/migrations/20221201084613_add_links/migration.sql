-- AlterTable
ALTER TABLE "Day" ADD COLUMN     "coffeeLink" TEXT,
ADD COLUMN     "videoLink" TEXT,
ALTER COLUMN "roasterLink" DROP NOT NULL;
