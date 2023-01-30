-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_password_key`(`password`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AccountID` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `account_id` VARCHAR(191) NOT NULL,
    `user_id` INTEGER NOT NULL,

    UNIQUE INDEX `AccountID_account_id_key`(`account_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transactions` (
    `transaction_id` INTEGER NOT NULL AUTO_INCREMENT,
    `transact_eth` DOUBLE NOT NULL,
    `transaction_time` DATETIME(3) NOT NULL,
    `transaction_from` VARCHAR(191) NOT NULL,
    `transaction_to` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`transaction_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Passphrase` (
    `passphrase_id` INTEGER NOT NULL AUTO_INCREMENT,
    `passphrase` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`passphrase_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AccountID` ADD CONSTRAINT `AccountID_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AccountID` ADD CONSTRAINT `AccountID_id_fkey` FOREIGN KEY (`id`) REFERENCES `Transactions`(`transaction_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Passphrase` ADD CONSTRAINT `Passphrase_passphrase_id_fkey` FOREIGN KEY (`passphrase_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
