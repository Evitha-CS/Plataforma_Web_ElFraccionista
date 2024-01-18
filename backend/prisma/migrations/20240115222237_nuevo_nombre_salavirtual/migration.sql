/*
  Warnings:

  - You are about to drop the `sala_virtual` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `sala_virtual` DROP FOREIGN KEY `Sala_Virtual_usuario1Id_fkey`;

-- DropForeignKey
ALTER TABLE `sala_virtual` DROP FOREIGN KEY `Sala_Virtual_usuario2Id_fkey`;

-- DropTable
DROP TABLE `sala_virtual`;

-- CreateTable
CREATE TABLE `Salavirtual` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombreSala` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `usuario1Id` INTEGER NULL,
    `usuario2Id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Salavirtual` ADD CONSTRAINT `Salavirtual_usuario1Id_fkey` FOREIGN KEY (`usuario1Id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Salavirtual` ADD CONSTRAINT `Salavirtual_usuario2Id_fkey` FOREIGN KEY (`usuario2Id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
