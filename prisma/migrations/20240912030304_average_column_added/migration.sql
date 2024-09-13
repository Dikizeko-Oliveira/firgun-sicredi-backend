/*
  Warnings:

  - Added the required column `average` to the `responses` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_responses" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cpf" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "origin_name" TEXT NOT NULL,
    "average" TEXT NOT NULL,
    "passed" BOOLEAN NOT NULL DEFAULT false,
    "already_sent" BOOLEAN NOT NULL DEFAULT false,
    "score" DECIMAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "responses_origin_fkey" FOREIGN KEY ("origin") REFERENCES "companies" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_responses" ("already_sent", "cpf", "created_at", "id", "origin", "origin_name", "passed", "score") SELECT "already_sent", "cpf", "created_at", "id", "origin", "origin_name", "passed", "score" FROM "responses";
DROP TABLE "responses";
ALTER TABLE "new_responses" RENAME TO "responses";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
