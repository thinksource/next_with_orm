import {MigrationInterface, QueryRunner} from "typeorm";

export class init1598009034969 implements MigrationInterface {
    name = 'init1598009034969'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `user` (`id` varchar(36) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `role` enum ('admin', 'active', 'blocked') NOT NULL DEFAULT 'active', `salt` varchar(255) NOT NULL, INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `project` (`id` varchar(36) NOT NULL, `expertise_required` varchar(1000) NOT NULL, `clinical_expertise` text NOT NULL, `COVID_19` tinyint NOT NULL, `start` date NOT NULL, `end` date NOT NULL, `contactId` varchar(36) NULL, `organizationId` varchar(36) NULL, UNIQUE INDEX `REL_b18f6960a7b74319aba20ae140` (`contactId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `technology` (`id` varchar(36) NOT NULL, `name` varchar(255) NOT NULL, `brief` varchar(1000) NOT NULL, `link` varchar(255) NOT NULL, `COVID_19` tinyint NOT NULL, `organizationId` varchar(36) NULL, `contactId` varchar(36) NULL, UNIQUE INDEX `REL_2cc174c7fcb7713745dbda578d` (`contactId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `organization` (`id` varchar(36) NOT NULL, `name` varchar(255) NOT NULL, `brief` text NOT NULL, `status` enum ('active', 'deactive') NOT NULL DEFAULT 'active', `website` varchar(255) NOT NULL, `mailext` text NOT NULL, `member` tinyint NOT NULL, `peopleId` varchar(36) NULL, `projectId` varchar(36) NULL, `technologyId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `person` (`id` varchar(36) NOT NULL, `expertise` text NOT NULL, `COVID_19` tinyint NOT NULL, `userId` varchar(36) NULL, `belongOrganizationId` varchar(36) NULL, UNIQUE INDEX `REL_83b775da14886d352de2a4cac0` (`userId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `contact` (`id` varchar(36) NOT NULL, `title` enum ('Mr', 'Miss', 'Dr', 'Mrs', 'Ms', '') NOT NULL DEFAULT '', `first_name` varchar(255) NOT NULL, `last_name` varchar(255) NOT NULL, `job_title` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `member` tinyint NOT NULL, `country` varchar(255) NOT NULL, `state` varchar(255) NOT NULL, `personId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `project` ADD CONSTRAINT `FK_b18f6960a7b74319aba20ae140a` FOREIGN KEY (`contactId`) REFERENCES `contact`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `project` ADD CONSTRAINT `FK_0028dfadf312a1d7f51656c4a9a` FOREIGN KEY (`organizationId`) REFERENCES `organization`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `technology` ADD CONSTRAINT `FK_5af76634d4e509c9dd25662eb0c` FOREIGN KEY (`organizationId`) REFERENCES `organization`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `technology` ADD CONSTRAINT `FK_2cc174c7fcb7713745dbda578d6` FOREIGN KEY (`contactId`) REFERENCES `contact`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `organization` ADD CONSTRAINT `FK_abb3672fc631e4eeaf87af0e7e1` FOREIGN KEY (`peopleId`) REFERENCES `person`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `organization` ADD CONSTRAINT `FK_7725c790526dcea9600c0d0d9a4` FOREIGN KEY (`projectId`) REFERENCES `project`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `organization` ADD CONSTRAINT `FK_d86763e5c3174df184df8f8b9a1` FOREIGN KEY (`technologyId`) REFERENCES `technology`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `person` ADD CONSTRAINT `FK_83b775da14886d352de2a4cac01` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `person` ADD CONSTRAINT `FK_affb4875fc39715b67d0e5bc82f` FOREIGN KEY (`belongOrganizationId`) REFERENCES `organization`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `contact` ADD CONSTRAINT `FK_a355360156dc34d5afff56aa47e` FOREIGN KEY (`personId`) REFERENCES `person`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `contact` DROP FOREIGN KEY `FK_a355360156dc34d5afff56aa47e`");
        await queryRunner.query("ALTER TABLE `person` DROP FOREIGN KEY `FK_affb4875fc39715b67d0e5bc82f`");
        await queryRunner.query("ALTER TABLE `person` DROP FOREIGN KEY `FK_83b775da14886d352de2a4cac01`");
        await queryRunner.query("ALTER TABLE `organization` DROP FOREIGN KEY `FK_d86763e5c3174df184df8f8b9a1`");
        await queryRunner.query("ALTER TABLE `organization` DROP FOREIGN KEY `FK_7725c790526dcea9600c0d0d9a4`");
        await queryRunner.query("ALTER TABLE `organization` DROP FOREIGN KEY `FK_abb3672fc631e4eeaf87af0e7e1`");
        await queryRunner.query("ALTER TABLE `technology` DROP FOREIGN KEY `FK_2cc174c7fcb7713745dbda578d6`");
        await queryRunner.query("ALTER TABLE `technology` DROP FOREIGN KEY `FK_5af76634d4e509c9dd25662eb0c`");
        await queryRunner.query("ALTER TABLE `project` DROP FOREIGN KEY `FK_0028dfadf312a1d7f51656c4a9a`");
        await queryRunner.query("ALTER TABLE `project` DROP FOREIGN KEY `FK_b18f6960a7b74319aba20ae140a`");
        await queryRunner.query("DROP TABLE `contact`");
        await queryRunner.query("DROP INDEX `REL_83b775da14886d352de2a4cac0` ON `person`");
        await queryRunner.query("DROP TABLE `person`");
        await queryRunner.query("DROP TABLE `organization`");
        await queryRunner.query("DROP INDEX `REL_2cc174c7fcb7713745dbda578d` ON `technology`");
        await queryRunner.query("DROP TABLE `technology`");
        await queryRunner.query("DROP INDEX `REL_b18f6960a7b74319aba20ae140` ON `project`");
        await queryRunner.query("DROP TABLE `project`");
        await queryRunner.query("DROP INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` ON `user`");
        await queryRunner.query("DROP TABLE `user`");
    }

}
