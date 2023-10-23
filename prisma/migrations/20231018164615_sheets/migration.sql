-- CreateTable
CREATE TABLE `Sheets` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `song_title` VARCHAR(191) NULL,
    `song_key` VARCHAR(1) NULL,
    `content` MEDIUMTEXT NOT NULL,
    `important` BOOLEAN NOT NULL DEFAULT false,
    `pinned` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
