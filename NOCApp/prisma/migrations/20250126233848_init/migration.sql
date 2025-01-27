-- CreateEnum
CREATE TYPE "SeverityLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateTable
CREATE TABLE "LogLevel" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "severity" "SeverityLevel" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LogLevel_pkey" PRIMARY KEY ("id")
);
