/*
  Warnings:

  - You are about to drop the `oauthApplication` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "oauthAccessToken" DROP CONSTRAINT "oauthAccessToken_clientId_fkey";

-- DropForeignKey
ALTER TABLE "oauthApplication" DROP CONSTRAINT "oauthApplication_userId_fkey";

-- DropForeignKey
ALTER TABLE "oauthConsent" DROP CONSTRAINT "oauthConsent_clientId_fkey";

-- DropTable
DROP TABLE "oauthApplication";

-- AddForeignKey
ALTER TABLE "oauthAccessToken" ADD CONSTRAINT "oauthAccessToken_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "oauthClient"("clientId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "oauthConsent" ADD CONSTRAINT "oauthConsent_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "oauthClient"("clientId") ON DELETE CASCADE ON UPDATE CASCADE;
