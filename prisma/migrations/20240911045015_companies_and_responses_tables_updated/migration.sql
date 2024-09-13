/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `companies` will be added. If there are existing duplicate values, this will fail.

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
    "score" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "responses_origin_fkey" FOREIGN KEY ("origin") REFERENCES "companies" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_responses" ("cpf", "created_at", "id", "origin", "origin_name", "score") SELECT "cpf", "created_at", "id", "origin", "origin_name", "score" FROM "responses";
DROP TABLE "responses";
ALTER TABLE "new_responses" RENAME TO "responses";
CREATE UNIQUE INDEX "responses_origin_key" ON "responses"("origin");
CREATE UNIQUE INDEX "responses_origin_name_key" ON "responses"("origin_name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "companies_email_key" ON "companies"("email");
