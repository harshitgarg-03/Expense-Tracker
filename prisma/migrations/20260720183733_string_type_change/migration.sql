/*
  Warnings:

  - The `scopes` column on the `oauthConsent` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "oauthConsent" DROP COLUMN "scopes",
ADD COLUMN     "scopes" TEXT[];
