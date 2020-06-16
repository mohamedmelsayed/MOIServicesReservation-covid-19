-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 16, 2020 at 02:50 PM
-- Server version: 10.1.27-MariaDB
-- PHP Version: 7.2.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cl23-kushite`
--

-- --------------------------------------------------------

--
-- Table structure for table `locations`
--

CREATE TABLE `locations` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `phone` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16;

--
-- Dumping data for table `locations`
--

INSERT INTO `locations` (`id`, `name`, `location`, `phone`) VALUES
(4, 'مجمع خدمات الجمهور - أم درمان', '', ''),
(5, 'مجمع خدمات الجمهور - بحري ', '', ''),
(6, 'مجمع خدمات الجمهور - الخرطوم ', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `phonenumber` varchar(25) NOT NULL,
  `nationalnumber` varchar(14) NOT NULL,
  `servicesid` int(11) NOT NULL,
  `locationsid` int(11) NOT NULL,
  `dateofapp` date NOT NULL,
  `fullname` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `phonenumber`, `nationalnumber`, `servicesid`, `locationsid`, `dateofapp`, `fullname`) VALUES
(1, '6456356', '645634', 1, 4, '2020-06-14', ''),
(2, '6456356', '645634', 1, 4, '2020-06-02', ''),
(3, '6456356', '645634', 2, 4, '2020-06-14', ''),
(4, '6456356', '645634', 2, 4, '2020-06-03', ''),
(5, '6456356', '645634', 1, 4, '2020-06-03', ''),
(6, '6456356', '645634', 1, 4, '2020-06-04', ''),
(7, '5435325', '32412', 0, 5, '2020-06-04', 'dfsgaf'),
(8, '5435325', '32412', 0, 5, '2020-06-04', 'dfsgaf'),
(9, '45643532', '12332', 0, 4, '2020-06-15', 'fgsdfgfdsg'),
(10, '433214', '435123', 0, 5, '2020-06-15', 'gfhsdgsdg'),
(11, '322', '432', 1, 4, '2020-06-02', 'ghdgh'),
(12, '322', '432', 1, 4, '2020-06-02', 'ghdgh'),
(13, '', '4234432', 2, 4, '2020-06-15', 'fdgsfdgsfd'),
(14, '3432', '52345', 2, 4, '2020-06-02', 'dfsdfa'),
(15, '3242', '43211', 2, 4, '2020-06-15', 'fdgfdsg'),
(16, '4352', '523', 1, 4, '2020-06-15', 'fgsdf');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `locationsid` int(11) NOT NULL,
  `maxapps` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `name`, `locationsid`, `maxapps`) VALUES
(1, 'جواز الكتروني', 4, 49),
(2, 'إستيفاء خروج', 4, 1),
(3, 'جواز إلكتروني', 4, 10),
(4, 'إستيفاء خروج', 4, 20),
(5, 'جواز إلكتروني', 5, 10),
(6, 'إستيفاء خروج', 5, 20),
(7, 'جواز إلكتروني', 6, 100),
(8, 'إستيفاء خروج', 6, 20);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `locations`
--
ALTER TABLE `locations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
