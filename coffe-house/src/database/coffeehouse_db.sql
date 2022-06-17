-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-06-2022 a las 23:30:28
-- Versión del servidor: 10.4.21-MariaDB
-- Versión de PHP: 8.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `coffeehouse_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grinds`
--

CREATE TABLE `grinds` (
  `id` int(10) UNSIGNED NOT NULL,
  `grind` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `grinds`
--

INSERT INTO `grinds` (`id`, `grind`) VALUES
(1, 'Grano entero'),
(2, 'Espresso'),
(3, 'Filtro');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grinds_products`
--

CREATE TABLE `grinds_products` (
  `id` int(10) UNSIGNED NOT NULL,
  `id_grind` int(10) UNSIGNED DEFAULT NULL,
  `id_product` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `grinds_products`
--

INSERT INTO `grinds_products` (`id`, `id_grind`, `id_product`) VALUES
(28, 1, 1),
(29, 2, 1),
(31, 2, 3),
(32, 1, 3),
(33, 3, 3),
(34, 1, 4),
(35, 2, 4),
(36, 3, 4),
(37, 1, 5),
(38, 2, 5),
(39, 1, 6),
(40, 1, 7),
(41, 3, 7),
(42, 2, 48),
(43, 3, 48),
(44, 2, 49);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `region` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `category_id` int(10) UNSIGNED DEFAULT NULL,
  `stock` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `region`, `image`, `category_id`, `stock`) VALUES
(1, 'Burundi', 'Un café único para paladares exquisitos, un café delicioso. Muy exótico, dulce, con un dulzor particular, acidez cítrica y notas florales que perduran en boca. Presenta un cuerpo sedoso y notas a toffee, pomelo rosado, earl gray y bergamota. Con un tueste', 2500, 'Mutumba', 'product-1650654494013.jpg', 1, 10),
(3, 'Kenya', 'Kenya es un café de cuerpo medio y, como muchos de los cafés africanos, \n        se transforma en una experiencia única cuando se combina con hielo. \n        Este café se diferencia por su sabor a cítricos que deja entrever toques de pomelo, \n        limó', 2500, 'Muranga', 'product-1650655824942.jpg', 2, 10),
(4, 'Guatemala', 'Un café dulce y cremoso, con notas a chocolate amargo y avellanas, con una acidez dulce con notas a ciruela. Ideal para espresso y moka italiana. Debido al cuerpo alto y notas dulces es un café que combina muy bien con todo tipo de leche.', 2000, 'Huehuetenango', 'product-1650658479882.jpg', 1, 10),
(5, 'Colombia', 'Un café dulce y muy fácil de tomar, con notas a chocolate y naranja, perfectamente balanceado. Ideal para espresso y moka italiana: nuestro café recomendado para preparar bebidas con leche.', 2200, 'Tolina', 'product-1650658798049.jpg', 2, 10),
(6, 'Colombia', 'Un café suave, exótico y delicado, con notas a frutilla y cereza, canela, y jazmín. Recomendado para métodos filtrados. Chemex, V60, Katita, Melitta, Clever, etc.', 2400, 'Huila', 'product-1650662381977.jpg', 2, 10),
(7, 'Sumatra Mandheling', 'El Café Sumatra Mandheling, cultivado en la región centro-oeste cerca de Padang, es conocido por su cuerpo liso y pesado que a veces se describe como almibarado. Los mejores cafés de Sumatra tienen una acidez relativamente baja, pero lo suficiente como pa', 2600, 'Padang', 'product-1650727852178.jpg', 3, 10),
(48, 'Nicaragua', 'El café de Nicaragua se caracteriza por tener un cuerpo suave y una acidez suave. No obstante, su sabor es muy particular: combina sabores sutiles y dulces, una combinación de nuez, chocolate, frutos rojos y toques de vainilla.', 2100, 'Matagalpa', 'product-1655234338247.jpg', 2, 8),
(49, 'Combo Medium Roast', 'Combo compuesto por una selección de tres tipos de cafés de tueste medio.', 4500, 'Colombia / Kenia / Nicaragua', 'product-1655320000357.jpg', 2, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products_users`
--

CREATE TABLE `products_users` (
  `id` int(10) UNSIGNED NOT NULL,
  `id_product` int(10) UNSIGNED DEFAULT NULL,
  `id_user` int(10) UNSIGNED DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product_category`
--

CREATE TABLE `product_category` (
  `id` int(10) UNSIGNED NOT NULL,
  `type` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `product_category`
--

INSERT INTO `product_category` (`id`, `type`) VALUES
(1, 'Blonde'),
(2, 'Medium'),
(3, 'Dark');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `user_category_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_category`
--

CREATE TABLE `user_category` (
  `id` int(10) UNSIGNED NOT NULL,
  `type` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `user_category`
--

INSERT INTO `user_category` (`id`, `type`) VALUES
(1, 'Admin'),
(2, 'Client');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `weight`
--

CREATE TABLE `weight` (
  `id` int(10) UNSIGNED NOT NULL,
  `weight` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `weight`
--

INSERT INTO `weight` (`id`, `weight`) VALUES
(1, 250),
(2, 500),
(3, 1000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `weight_products`
--

CREATE TABLE `weight_products` (
  `id` int(10) UNSIGNED NOT NULL,
  `id_weight` int(10) UNSIGNED DEFAULT NULL,
  `id_product` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `weight_products`
--

INSERT INTO `weight_products` (`id`, `id_weight`, `id_product`) VALUES
(7, 2, 48),
(8, 2, 1),
(9, 3, 1),
(10, 1, 3),
(11, 2, 3),
(12, 2, 4),
(13, 3, 4),
(14, 3, 5),
(15, 2, 6),
(16, 2, 7),
(17, 3, 7),
(19, 2, 49);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `grinds`
--
ALTER TABLE `grinds`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `grinds_products`
--
ALTER TABLE `grinds_products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_grinds` (`id_grind`),
  ADD KEY `fk_grinds_product` (`id_product`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_products_category` (`category_id`);

--
-- Indices de la tabla `products_users`
--
ALTER TABLE `products_users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_product` (`id_product`),
  ADD KEY `fk_user` (`id_user`);

--
-- Indices de la tabla `product_category`
--
ALTER TABLE `product_category`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user_category` (`user_category_id`);

--
-- Indices de la tabla `user_category`
--
ALTER TABLE `user_category`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `weight`
--
ALTER TABLE `weight`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `weight_products`
--
ALTER TABLE `weight_products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_weight` (`id_weight`),
  ADD KEY `fk_weight_product` (`id_product`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `grinds`
--
ALTER TABLE `grinds`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `grinds_products`
--
ALTER TABLE `grinds_products`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT de la tabla `products_users`
--
ALTER TABLE `products_users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `product_category`
--
ALTER TABLE `product_category`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `user_category`
--
ALTER TABLE `user_category`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `weight`
--
ALTER TABLE `weight`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `weight_products`
--
ALTER TABLE `weight_products`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `grinds_products`
--
ALTER TABLE `grinds_products`
  ADD CONSTRAINT `fk_grinds` FOREIGN KEY (`id_grind`) REFERENCES `grinds` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_grinds_product` FOREIGN KEY (`id_product`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `fk_products_category` FOREIGN KEY (`category_id`) REFERENCES `product_category` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `products_users`
--
ALTER TABLE `products_users`
  ADD CONSTRAINT `fk_product` FOREIGN KEY (`id_product`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_user_category` FOREIGN KEY (`user_category_id`) REFERENCES `user_category` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `weight_products`
--
ALTER TABLE `weight_products`
  ADD CONSTRAINT `fk_weight` FOREIGN KEY (`id_weight`) REFERENCES `weight` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_weight_product` FOREIGN KEY (`id_product`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
