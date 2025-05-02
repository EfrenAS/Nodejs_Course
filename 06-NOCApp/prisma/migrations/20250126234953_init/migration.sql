/*
  Warnings:

  - You are about to drop the `LogLevel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "LogLevel";

-- CreateTable
CREATE TABLE "logModel" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "severity" "SeverityLevel" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "logModel_pkey" PRIMARY KEY ("id")
);
