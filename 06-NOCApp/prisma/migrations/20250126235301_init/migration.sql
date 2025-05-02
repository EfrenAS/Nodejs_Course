/*
  Warnings:

  - Added the required column `origin` to the `logModel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "logModel" ADD COLUMN     "origin" TEXT NOT NULL;
