/*
  Warnings:

  - Added the required column `grado` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `curso` VARCHAR(191) NULL DEFAULT '',
    ADD COLUMN `grado` INTEGER NOT NULL;
