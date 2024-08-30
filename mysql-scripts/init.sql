
--
-- Table structure for table `accounts`
--

-- create database if not EXISTS qa;

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `tenant_id` int DEFAULT NULL,
  `agency_id` int DEFAULT NULL,
  `customer_id` int DEFAULT NULL,
  `default` tinyint(1) NOT NULL DEFAULT '0',
  `default_contact_id` int DEFAULT NULL,
  `name` varchar(96) DEFAULT NULL,
  `phone_number` varchar(16) DEFAULT NULL,
  `stripe_id` varchar(255) DEFAULT NULL,
  `current_payment_method` varchar(255) DEFAULT NULL,
  `address_line1` varchar(255) NOT NULL,
  `address_line2` varchar(255) DEFAULT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `zip` varchar(255) NOT NULL,
  `timezone` varchar(255) DEFAULT NULL,
  `cut_off` varchar(50) DEFAULT NULL,
  `monthly_cut_off` tinyint(1) DEFAULT '0',
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
