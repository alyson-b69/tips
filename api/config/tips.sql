CREATE DATABASE `tips`;

USE tips;

CREATE TABLE `user`
(
`id` INT NOT NULL UNIQUE AUTO_INCREMENT,
`username` VARCHAR
(80) NOT NULL UNIQUE,
`email` VARCHAR
(150) NOT NULL UNIQUE,
`firstname` VARCHAR
(40) NOT NULL,
`lastname` VARCHAR
(40) NOT NULL,
`password` VARCHAR
(80) NOT NULL,
`is_active` TINYINT(1) NOT NULL DEFAULT 1,
`created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
`updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY
(`id`)
);

CREATE TABLE `tip`
(
`id` INT NOT NULL UNIQUE AUTO_INCREMENT,
`title` VARCHAR
(255) NOT NULL,
`author_id` INT NOT NULL,
`slug` VARCHAR
(200) NOT NULL UNIQUE,
`body` TEXT NOT NULL,
`created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
`updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
`published` TINYINT(1) NOT NULL DEFAULT 1,
PRIMARY KEY
(`id`),
FOREIGN KEY(`author_id`) REFERENCES user(id)
);

create table category
(
    `id` INT NOT NULL AUTO_INCREMENT UNIQUE,
    `name` VARCHAR(20) NOT NULL UNIQUE,
    primary key(id)
);

CREATE TABLE `tip_category`
(
    `tip_id` INT NOT NULL,
    `category_id` INT NOT NULL,
    FOREIGN KEY(`tip_id`) REFERENCES tip (id),
    FOREIGN KEY(`category_id`) REFERENCES category (id)
);

CREATE TABLE `user_like_tip`
(
    `user_id` INT NOT NULL,
    `tip_id` INT NOT NULL,
    FOREIGN KEY(`user_id`) REFERENCES user (id),
    FOREIGN KEY(`tip_id`) REFERENCES tip (id)
);

