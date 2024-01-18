-- DropIndex
DROP INDEX `Salavirtual_usuario1Id_fkey` ON `salavirtual`;

-- DropIndex
DROP INDEX `Salavirtual_usuario2Id_fkey` ON `salavirtual`;

-- AddForeignKey
ALTER TABLE `Salavirtual` ADD CONSTRAINT `Salavirtual_usuario1Id_fkey` FOREIGN KEY (`usuario1Id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Salavirtual` ADD CONSTRAINT `Salavirtual_usuario2Id_fkey` FOREIGN KEY (`usuario2Id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
