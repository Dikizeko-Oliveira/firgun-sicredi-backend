/*
  Warnings:

  - You are about to alter the column `score` on the `responses` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal`.
  - You are about to alter the column `value` on the `answers` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_responses" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cpf" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "origin_name" TEXT NOT NULL,
    "passed" BOOLEAN NOT NULL DEFAULT false,
    "already_sent" BOOLEAN NOT NULL DEFAULT false,
    "score" DECIMAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "responses_origin_fkey" FOREIGN KEY ("origin") REFERENCES "companies" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_responses" ("already_sent", "cpf", "created_at", "id", "origin", "origin_name", "passed", "score") SELECT "already_sent", "cpf", "created_at", "id", "origin", "origin_name", "passed", "score" FROM "responses";
DROP TABLE "responses";
ALTER TABLE "new_responses" RENAME TO "responses";
CREATE TABLE "new_answers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "value" DECIMAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "questionsId" TEXT,
    CONSTRAINT "answers_questionsId_fkey" FOREIGN KEY ("questionsId") REFERENCES "questions" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_answers" ("created_at", "id", "name", "questionsId", "value") SELECT "created_at", "id", "name", "questionsId", "value" FROM "answers";
DROP TABLE "answers";
ALTER TABLE "new_answers" RENAME TO "answers";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
