/*
  Warnings:

  - Added the required column `origin_name` to the `responses` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_responses" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cpf" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "origin_name" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "responses_origin_fkey" FOREIGN KEY ("origin") REFERENCES "companies" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_responses" ("cpf", "created_at", "id", "origin", "score") SELECT "cpf", "created_at", "id", "origin", "score" FROM "responses";
DROP TABLE "responses";
ALTER TABLE "new_responses" RENAME TO "responses";
CREATE UNIQUE INDEX "responses_origin_key" ON "responses"("origin");
CREATE UNIQUE INDEX "responses_origin_name_key" ON "responses"("origin_name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
