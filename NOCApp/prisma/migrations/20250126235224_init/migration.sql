/*
  Warnings:

  - You are about to drop the column `name` on the `logModel` table. All the data in the column will be lost.
  - Added the required column `message` to the `logModel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "logModel" DROP COLUMN "name",
ADD COLUMN     "message" TEXT NOT NULL;
