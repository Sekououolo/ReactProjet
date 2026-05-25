-- CreateTable
CREATE TABLE `Paiement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `num` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `support` VARCHAR(191) NOT NULL,
    `details` VARCHAR(191) NULL,
    `commandeId` INTEGER NOT NULL,

    UNIQUE INDEX `Paiement_num_key`(`num`),
    UNIQUE INDEX `Paiement_commandeId_key`(`commandeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Livraison` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `num` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `adresseL` VARCHAR(191) NOT NULL,
    `livreur` VARCHAR(191) NOT NULL,
    `commandeId` INTEGER NOT NULL,

    UNIQUE INDEX `Livraison_num_key`(`num`),
    UNIQUE INDEX `Livraison_commandeId_key`(`commandeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Paiement` ADD CONSTRAINT `Paiement_commandeId_fkey` FOREIGN KEY (`commandeId`) REFERENCES `Commande`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Livraison` ADD CONSTRAINT `Livraison_commandeId_fkey` FOREIGN KEY (`commandeId`) REFERENCES `Commande`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
