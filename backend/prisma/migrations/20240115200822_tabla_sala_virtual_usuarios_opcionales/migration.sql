-- DropForeignKey
ALTER TABLE `sala_virtual` DROP FOREIGN KEY `Sala_Virtual_usuario1Id_fkey`;

-- DropForeignKey
ALTER TABLE `sala_virtual` DROP FOREIGN KEY `Sala_Virtual_usuario2Id_fkey`;

-- AlterTable
ALTER TABLE `sala_virtual` MODIFY `usuario1Id` INTEGER NULL,
    MODIFY `usuario2Id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Sala_Virtual` ADD CONSTRAINT `Sala_Virtual_usuario1Id_fkey` FOREIGN KEY (`usuario1Id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sala_Virtual` ADD CONSTRAINT `Sala_Virtual_usuario2Id_fkey` FOREIGN KEY (`usuario2Id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
