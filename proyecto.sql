-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-01-2024 a las 16:44:24
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proyecto`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ciudad`
--

CREATE TABLE `ciudad` (
  `id` int(11) NOT NULL,
  `nombre` varchar(191) NOT NULL,
  `regionId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `ciudad`
--

INSERT INTO `ciudad` (`id`, `nombre`, `regionId`) VALUES
(1, 'Iquique', 1),
(2, 'Alto Hospicio', 1),
(3, 'Pozo Almonte', 1),
(4, 'Huara', 1),
(5, 'Pica', 1),
(6, 'Antofagasta', 2),
(7, 'Calama', 2),
(8, 'Tocopilla', 2),
(9, 'Mejillones', 2),
(10, 'Taltal', 2),
(11, 'Copiapó', 3),
(12, 'Caldera', 3),
(13, 'Vallenar', 3),
(14, 'Chañaral', 3),
(15, 'Huasco', 3),
(16, 'La Serena', 4),
(17, 'Coquimbo', 4),
(18, 'Ovalle', 4),
(19, 'Illapel', 4),
(20, 'Vicuña', 4),
(21, 'Valparaíso', 5),
(22, 'Viña del Mar', 5),
(23, 'Quilpué', 5),
(24, 'Villa Alemana', 5),
(25, 'San Antonio', 5),
(26, 'Rancagua', 6),
(27, 'San Fernando', 6),
(28, 'Pichilemu', 6),
(29, 'Santa Cruz', 6),
(30, 'Rengo', 6),
(31, 'Talca', 7),
(32, 'Curicó', 7),
(33, 'Linares', 7),
(34, 'Constitución', 7),
(35, 'Cauquenes', 7),
(36, 'Concepción', 8),
(37, 'Talcahuano', 8),
(38, 'Chillán', 8),
(39, 'Los Ángeles', 8),
(40, 'Coronel', 8),
(41, 'Temuco', 9),
(42, 'Villarrica', 9),
(43, 'Angol', 9),
(44, 'Pucón', 9),
(45, 'Victoria', 9),
(46, 'Puerto Montt', 10),
(47, 'Osorno', 10),
(48, 'Castro', 10),
(49, 'Ancud', 10),
(50, 'Puerto Varas', 10),
(51, 'Coyhaique', 11),
(52, 'Aysén', 11),
(53, 'Chile Chico', 11),
(54, 'Cochrane', 11),
(55, 'Puerto Aysén', 11),
(56, 'Punta Arenas', 12),
(57, 'Puerto Natales', 12),
(58, 'Porvenir', 12),
(59, 'Puerto Williams', 12),
(60, 'Cabo de Hornos', 12),
(61, 'Santiago', 13),
(62, 'Maipú', 13),
(63, 'Peñalolén', 13),
(64, 'Las Condes', 13),
(65, 'La Florida', 13),
(66, 'Valdivia', 14),
(67, 'La Unión', 14),
(68, 'Río Bueno', 14),
(69, 'Panguipulli', 14),
(70, 'Paillaco', 14),
(71, 'Arica', 15),
(72, 'Putre', 15),
(73, 'General Lagos', 15),
(74, 'Camarones', 15),
(75, 'Codpa', 15),
(76, 'Chillán', 16),
(77, 'Chillán Viejo', 16),
(78, 'Cobquecura', 16),
(79, 'Coelemu', 16),
(80, 'Quillón', 16);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `curso`
--

CREATE TABLE `curso` (
  `id` int(11) NOT NULL,
  `nombre` varchar(191) NOT NULL,
  `grado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `curso`
--

INSERT INTO `curso` (`id`, `nombre`, `grado`) VALUES
(1, 'A', 5),
(2, 'A', 5),
(3, 'A', 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `partida`
--

CREATE TABLE `partida` (
  `id` int(11) NOT NULL,
  `nombreGanador` varchar(191) NOT NULL,
  `tiempoDuracion` varchar(191) NOT NULL,
  `equivocacionesJugador1` int(11) NOT NULL,
  `equivocacionesJugador2` int(11) NOT NULL,
  `movimientosJugador1` int(11) NOT NULL,
  `movimientosJugador2` int(11) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `jugador1Id` int(11) NOT NULL,
  `jugador2Id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `partida`
--

INSERT INTO `partida` (`id`, `nombreGanador`, `tiempoDuracion`, `equivocacionesJugador1`, `equivocacionesJugador2`, `movimientosJugador1`, `movimientosJugador2`, `createdAt`, `jugador1Id`, `jugador2Id`) VALUES
(2, 'Evelyn Cariaga', '0', 0, 0, 0, 0, '2023-12-16 02:02:21.781', 1, 2),
(3, 'Evelyn Cariaga', '0', 0, 0, 0, 0, '2023-12-16 02:04:36.235', 1, 2),
(4, 'Evelyn Cariaga', '00:05:78', 0, 0, 0, 0, '2023-12-16 02:08:31.518', 1, 2),
(5, 'Evelyn Cariaga', '00:17:18', 2, 1, 0, 0, '2023-12-16 02:34:49.766', 1, 2),
(6, 'Esteban Cariaga', '00:21:70', 0, 1, 3, 0, '2023-12-16 02:57:38.638', 1, 2),
(7, 'Esteban Cariaga', '00:20:42', 0, 0, 1, 0, '2023-12-16 03:00:05.574', 1, 2),
(8, 'Esteban Cariaga', '00:14:30', 0, 1, 0, 0, '2023-12-16 03:12:15.694', 1, 2),
(9, 'Esteban Cariaga', '00:17:68', 1, 0, 2, 0, '2023-12-16 03:25:45.567', 1, 2),
(10, 'Evelyn Cariaga', '00:13:80', 1, 0, 2, 0, '2023-12-16 03:55:56.305', 1, 2),
(11, 'Evelyn Cariaga', '00:21:31', 1, 2, 2, 0, '2023-12-16 03:58:10.327', 1, 2),
(12, 'Evelyn Cariaga', '00:33:78', 0, 1, 3, 2, '2023-12-16 04:10:56.065', 1, 2),
(13, 'Evelyn Cariaga', '00:24:00', 1, 2, 2, 1, '2023-12-16 04:12:25.665', 1, 2),
(14, 'Evelyn Cariaga', '00:21:50', 1, 1, 2, 1, '2023-12-16 14:38:05.481', 1, 2),
(15, 'Esteban Cariaga', '00:25:86', 0, 1, 3, 1, '2023-12-16 14:39:38.827', 2, 1),
(16, 'Evelyn Cariaga', '00:40:56', 1, 0, 4, 3, '2023-12-16 14:59:05.926', 1, 2),
(17, 'Juan Perez', '00:28:22', 0, 2, 3, 1, '2023-12-16 15:08:04.131', 3, 4),
(18, 'Juan Perez', '00:18:53', 0, 1, 2, 1, '2023-12-17 16:11:22.520', 3, 4),
(20, 'Maria Zapata', '00:38:52', 0, 2, 3, 3, '2023-12-18 07:42:41.497', 3, 4),
(21, 'Juan Perez', '01:15:40', 0, 5, 9, 6, '2023-12-18 08:25:30.235', 3, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `region`
--

CREATE TABLE `region` (
  `id` int(11) NOT NULL,
  `nombre` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `region`
--

INSERT INTO `region` (`id`, `nombre`) VALUES
(1, 'I - Tarapacá'),
(2, 'II - Antofagasta'),
(3, 'III - Atacama'),
(4, 'IV - Coquimbo'),
(5, 'V - Valparaíso'),
(6, 'VI - O\'Higgins'),
(7, 'VII - Maule'),
(8, 'VIII - Biobío'),
(9, 'IX - Araucanía'),
(10, 'X - Los Lagos'),
(11, 'XI - Aysén'),
(12, 'XII - Magallanes'),
(13, 'XIII - Metropolitana de Santiago'),
(14, 'XIV - Los Ríos'),
(15, 'XV - Arica y Parinacota'),
(16, 'XVI - Ñuble');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `registeredAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `email` varchar(191) NOT NULL,
  `nombre` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `telefono` varchar(191) DEFAULT NULL,
  `role` enum('USER','PROFESOR','ADMIN') NOT NULL DEFAULT 'USER',
  `ciudadId` int(11) DEFAULT NULL,
  `regionId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `registeredAt`, `email`, `nombre`, `password`, `telefono`, `role`, `ciudadId`, `regionId`) VALUES
(1, '2023-12-13 02:17:08.709', 'correo@gmail.com', 'Evelyn Cariaga', '$2a$10$MNI4ZWJt2cKN8YYjuRI91ubg//T4m37iKUXshfPtgmWcEXhbvNHDS', '+56912345678', 'ADMIN', NULL, NULL),
(2, '2023-12-13 02:25:53.152', 'esteban@gmail.com', 'Esteban Cariaga', '$2a$10$IfXkzYsE0pOlLfmwX2jKOu.7d0//9tBB6UWPO.N9wgnMtLqhpLXaG', '+56912345678', 'USER', NULL, NULL),
(3, '2023-12-16 15:04:08.460', 'juan@gmail.com', 'Juan Perez', '$2a$10$tmm0oW5U9mevUo735Uowjeg6WZilC2YZsqMvTadsKnSBhkqz31qQu', '+56912345678', 'USER', NULL, NULL),
(4, '2023-12-16 15:05:15.207', 'maria@gmail.com', 'Maria Zapata', '$2a$10$iuS4IVDw9PeM54yWGc8VVeFoCE0eitO.GyJM0gxOZs7hupjY0E8Ni', '+56912345678', 'USER', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `_cursotouser`
--

CREATE TABLE `_cursotouser` (
  `A` int(11) NOT NULL,
  `B` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `_cursotouser`
--

INSERT INTO `_cursotouser` (`A`, `B`) VALUES
(1, 2),
(1, 3),
(1, 4),
(3, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('05626b67-fd20-4deb-b77f-22a9b5e7d55c', '54f40e78744b8859bdfd195c4886519f788f0c3912260105cf550eb026325810', '2023-12-14 20:44:46.331', '20231214204446_init2', NULL, NULL, '2023-12-14 20:44:46.270', 1),
('35c6603b-e7af-4a5d-8b27-b3fef6ba41a9', '848d2ffa87e3af8be5d12d569c50de0c81983a173d77d69f745fd5cfa72e1539', '2023-12-16 02:05:25.138', '20231216020525_init4', NULL, NULL, '2023-12-16 02:05:25.114', 1),
('516f891d-dbf3-4b67-8f97-40636fa2b284', 'ad71515680a7b2c6a822ae31a183c5f00cba5875b37dfdc3ea9e2f5678af44bc', '2023-12-13 02:15:52.106', '20231017041759_migracion2', NULL, NULL, '2023-12-13 02:15:52.093', 1),
('649d62da-35f3-4eb4-b3a5-0ce6dfbfaea1', '0d136829261dd39bfdbee0f71d9dd12c89c7d3ecb809efbcb5e65216eb5a0149', '2023-12-13 02:15:52.091', '20230903215714_primera_migracion', NULL, NULL, '2023-12-13 02:15:52.077', 1),
('ab813796-b1e4-4d88-a592-e1e71a5aa61c', '370c32ae68db788e7a5e953b151cf7e7b255ce92689562ab8ebc7519e3160253', '2023-12-13 02:15:52.208', '20231107004815_actualizacion_db', NULL, NULL, '2023-12-13 02:15:52.144', 1),
('aced73ad-16e8-4117-8dcb-abd329fce17f', '1e147c2871724b38bd31b209e68850ed2435f4219581474aca7806d5b3953520', '2023-12-17 15:58:09.544', '20231216072352_regiones_y_ciudades', NULL, NULL, '2023-12-17 15:58:09.448', 1),
('c4c0877b-51c9-4dd7-b0c6-2dcd79bdd59f', 'ff206fb040450974959d56a5cf54c3aac7bafb240f20b4beed79fa0f330fa8f5', '2023-12-13 02:15:52.142', '20231027235250_agregar_opcional', NULL, NULL, '2023-12-13 02:15:52.108', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ciudad`
--
ALTER TABLE `ciudad`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Ciudad_regionId_fkey` (`regionId`);

--
-- Indices de la tabla `curso`
--
ALTER TABLE `curso`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `partida`
--
ALTER TABLE `partida`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Partida_jugador1Id_fkey` (`jugador1Id`),
  ADD KEY `Partida_jugador2Id_fkey` (`jugador2Id`);

--
-- Indices de la tabla `region`
--
ALTER TABLE `region`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_email_key` (`email`),
  ADD KEY `User_regionId_fkey` (`regionId`),
  ADD KEY `User_ciudadId_fkey` (`ciudadId`);

--
-- Indices de la tabla `_cursotouser`
--
ALTER TABLE `_cursotouser`
  ADD UNIQUE KEY `_CursoToUser_AB_unique` (`A`,`B`),
  ADD KEY `_CursoToUser_B_index` (`B`);

--
-- Indices de la tabla `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ciudad`
--
ALTER TABLE `ciudad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT de la tabla `curso`
--
ALTER TABLE `curso`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `partida`
--
ALTER TABLE `partida`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `region`
--
ALTER TABLE `region`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `ciudad`
--
ALTER TABLE `ciudad`
  ADD CONSTRAINT `Ciudad_regionId_fkey` FOREIGN KEY (`regionId`) REFERENCES `region` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `partida`
--
ALTER TABLE `partida`
  ADD CONSTRAINT `Partida_jugador1Id_fkey` FOREIGN KEY (`jugador1Id`) REFERENCES `user` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Partida_jugador2Id_fkey` FOREIGN KEY (`jugador2Id`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `User_ciudadId_fkey` FOREIGN KEY (`ciudadId`) REFERENCES `ciudad` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `User_regionId_fkey` FOREIGN KEY (`regionId`) REFERENCES `region` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `_cursotouser`
--
ALTER TABLE `_cursotouser`
  ADD CONSTRAINT `_CursoToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `curso` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `_CursoToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
