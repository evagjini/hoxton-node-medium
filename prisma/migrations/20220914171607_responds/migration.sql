-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Likes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "blogId" INTEGER NOT NULL,
    CONSTRAINT "Likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Likes_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Likes" ("blogId", "id", "userId") SELECT "blogId", "id", "userId" FROM "Likes";
DROP TABLE "Likes";
ALTER TABLE "new_Likes" RENAME TO "Likes";
CREATE TABLE "new_Responds" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "blogId" INTEGER NOT NULL,
    CONSTRAINT "Responds_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Responds_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Responds" ("blogId", "id", "userId") SELECT "blogId", "id", "userId" FROM "Responds";
DROP TABLE "Responds";
ALTER TABLE "new_Responds" RENAME TO "Responds";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
