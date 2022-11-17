-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 17, 2022 at 12:14 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.0.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `proyek_3`
--

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `image` varchar(225) NOT NULL,
  `url` varchar(225) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `uuid`, `name`, `price`, `image`, `url`, `userId`, `createdAt`, `updatedAt`) VALUES
(1, '3d04c776-a5a4-41c8-8bf5-a594dc1a0d59', 'product 1', 10000, 'img', 'nurl', 1, '2022-11-08 10:58:05', '2022-11-08 10:58:05'),
(3, '35ed2c8a-799c-4aa5-95ae-25091f80145a', 'product 2', 200000, 'img', 'url', 2, '2022-11-08 11:07:16', '2022-11-08 11:07:16'),
(10, '3a68abb5-3bc6-4d1a-8780-388f07a7e0cc', 'product by alhidayahkircon@gmail.com', 200000, 'gambar', 'url', 2, '2022-11-10 17:21:33', '2022-11-10 17:21:33'),
(11, 'f04dbb5e-3bad-49ce-bdf7-3cc043a3bfbd', 'product by fuckof@gmail.com', 200000, 'gambar', 'url', 2, '2022-11-10 17:21:55', '2022-11-10 17:21:55'),
(12, '243977f9-3183-479b-8de2-a9b17a6a2a05', 'product by postman', 200000, 'gambar', 'url', 2, '2022-11-10 17:22:40', '2022-11-10 17:22:40'),
(13, 'cc5576a3-5968-4dcd-8877-9777310cd306', 'produk postman', 2000, 'a663c7a68cc69788c1af030b24d5a82e.jpg', 'http://localhost:5000/images/a663c7a68cc69788c1af030b24d5a82e.jpg', 2, '2022-11-10 18:07:04', '2022-11-10 18:07:04'),
(14, 'fd9aad4c-d20c-404e-a475-d06096c4c030', 'produk postman', 2000, 'a663c7a68cc69788c1af030b24d5a82e.jpg', 'http://localhost:5000/images/a663c7a68cc69788c1af030b24d5a82e.jpg', 2, '2022-11-11 14:37:58', '2022-11-11 14:37:58'),
(15, '75afcaa2-b25d-4d69-b98a-0727b231c964', 'produk tambahan', 2000, '8d5043a7b7b25b8f4245a5da437e98c1.jpg', 'http://localhost:5000/images/8d5043a7b7b25b8f4245a5da437e98c1.jpg', 2, '2022-11-11 14:38:42', '2022-11-11 14:38:42');

-- --------------------------------------------------------

--
-- Table structure for table `Sessions`
--

CREATE TABLE `Sessions` (
  `sid` varchar(36) NOT NULL,
  `expires` datetime DEFAULT NULL,
  `data` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Sessions`
--

INSERT INTO `Sessions` (`sid`, `expires`, `data`, `createdAt`, `updatedAt`) VALUES
('EM5QXtzl20gYUkKp3n6vlDC40Zo0eL4t', '2022-11-15 19:25:18', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2022-11-14 19:25:18', '2022-11-14 19:25:18'),
('NLMH_o_IydfB1Z7OprLb9cqFGhlHk_Zi', '2022-11-18 11:06:50', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"7421cf7d-823b-493e-9c12-dd64b50402ce\"}', '2022-11-13 13:09:41', '2022-11-17 11:06:50'),
('OkZ-WO4OHKc62ghFJwtPTWvrm7tQvNso', '2022-11-12 14:40:39', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2022-11-11 14:40:21', '2022-11-11 14:40:39'),
('rUyF3zh1z4vSu6VCBAeNARtMr0CdXbRH', '2022-11-11 18:26:48', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2022-11-10 18:25:48', '2022-11-10 18:26:48'),
('yjwKc3MMbjXYQ_4CPSwuohVdyYj3c0Dw', '2022-11-14 13:15:41', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2022-11-13 13:15:41', '2022-11-13 13:15:41');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `number` text NOT NULL,
  `role` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `uuid`, `name`, `email`, `password`, `number`, `role`, `createdAt`, `updatedAt`) VALUES
(1, '0b170c5b-0530-4afc-bdb1-f58b2555ecbf', 'James Hunt F1', 'james@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$z+jcz3On59zbFyHqXVkM7w$+UKaAun7ldTVkTAn+vD1pBW9sITqJDaA1oX6MvI4pRo', '81234567', 'user', '2022-11-07 08:39:47', '2022-11-09 07:33:32'),
(2, '7421cf7d-823b-493e-9c12-dd64b50402ce', 'Ujang Aripin II', 'ujang@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$3oEqLzgwH1zHopgUxpPeDQ$st4ed6hGk4zpxcY0ldFPdyc0fMZmKjOfbLTbIJhuXek', '+62 089123456654', 'admin', '2022-11-07 08:40:15', '2022-11-09 07:57:26');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `Sessions`
--
ALTER TABLE `Sessions`
  ADD PRIMARY KEY (`sid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
