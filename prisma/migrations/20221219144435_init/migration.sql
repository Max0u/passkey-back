/*
  Warnings:

  - Added the required column `transports` to the `Authenticator` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Authenticator" ADD COLUMN     "transports" TEXT NOT NULL;
