/*
  Warnings:

  - You are about to drop the column `severity` on the `logModel` table. All the data in the column will be lost.
  - Added the required column `level` to the `logModel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "logModel" DROP COLUMN "severity",
ADD COLUMN     "level" "SeverityLevel" NOT NULL;
