-- CreateTable
CREATE TABLE "Day" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "date" DATETIME NOT NULL,
    "roaster" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "coffee" TEXT NOT NULL,
    "tastingNotes" TEXT NOT NULL,
    "varieties" TEXT NOT NULL,
    "roasterLink" TEXT NOT NULL
);
