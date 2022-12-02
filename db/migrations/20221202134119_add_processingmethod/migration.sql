-- AlterTable
ALTER TABLE "Day" ADD COLUMN     "processingMethod" TEXT DEFAULT '',
ALTER COLUMN "roasterLink" SET DEFAULT '',
ALTER COLUMN "coffeeLink" SET DEFAULT '',
ALTER COLUMN "videoLink" SET DEFAULT '';
