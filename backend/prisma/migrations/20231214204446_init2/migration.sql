-- CreateTable
CREATE TABLE `Partida` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombreGanador` VARCHAR(191) NOT NULL,
    `tiempoDuracion` INTEGER NOT NULL,
    `equivocacionesJugador1` INTEGER NOT NULL,
    `equivocacionesJugador2` INTEGER NOT NULL,
    `movimientosJugador1` INTEGER NOT NULL,
    `movimientosJugador2` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `jugador1Id` INTEGER NOT NULL,
    `jugador2Id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Partida` ADD CONSTRAINT `Partida_jugador1Id_fkey` FOREIGN KEY (`jugador1Id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Partida` ADD CONSTRAINT `Partida_jugador2Id_fkey` FOREIGN KEY (`jugador2Id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
