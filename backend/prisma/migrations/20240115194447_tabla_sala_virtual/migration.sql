-- CreateTable
CREATE TABLE `Sala_Virtual` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombreSala` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `usuario1Id` INTEGER NOT NULL,
    `usuario2Id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Sala_Virtual` ADD CONSTRAINT `Sala_Virtual_usuario1Id_fkey` FOREIGN KEY (`usuario1Id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sala_Virtual` ADD CONSTRAINT `Sala_Virtual_usuario2Id_fkey` FOREIGN KEY (`usuario2Id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
