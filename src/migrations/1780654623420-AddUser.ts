import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUser1780654623420 implements MigrationInterface {
    name = 'AddUser1780654623420'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "password" varchar NOT NULL, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"))`);
        await queryRunner.query(`CREATE TABLE "temporary_offers" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "bidPrice" numeric, "auctionId" integer NOT NULL, "buyer" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "FK_9efdf260cd45b23f2d03808a435" FOREIGN KEY ("auctionId") REFERENCES "auctions" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_offers"("id", "bidPrice", "auctionId", "buyer", "createdAt") SELECT "id", "bidPrice", "auctionId", "buyer", "createdAt" FROM "offers"`);
        await queryRunner.query(`DROP TABLE "offers"`);
        await queryRunner.query(`ALTER TABLE "temporary_offers" RENAME TO "offers"`);
        await queryRunner.query(`CREATE TABLE "temporary_auctions" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "startingPrice" numeric NOT NULL, "currentPrice" numeric NOT NULL, "endDate" datetime NOT NULL, "seller" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "temporary_auctions"("id", "title", "description", "startingPrice", "currentPrice", "endDate", "seller", "createdAt") SELECT "id", "title", "description", "startingPrice", "currentPrice", "endDate", "seller", "createdAt" FROM "auctions"`);
        await queryRunner.query(`DROP TABLE "auctions"`);
        await queryRunner.query(`ALTER TABLE "temporary_auctions" RENAME TO "auctions"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auctions" RENAME TO "temporary_auctions"`);
        await queryRunner.query(`CREATE TABLE "auctions" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "startingPrice" numeric NOT NULL, "currentPrice" numeric NOT NULL, "endDate" datetime NOT NULL, "seller" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "auctions"("id", "title", "description", "startingPrice", "currentPrice", "endDate", "seller", "createdAt") SELECT "id", "title", "description", "startingPrice", "currentPrice", "endDate", "seller", "createdAt" FROM "temporary_auctions"`);
        await queryRunner.query(`DROP TABLE "temporary_auctions"`);
        await queryRunner.query(`ALTER TABLE "offers" RENAME TO "temporary_offers"`);
        await queryRunner.query(`CREATE TABLE "offers" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "bidPrice" numeric, "auctionId" integer NOT NULL, "buyer" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "FK_9efdf260cd45b23f2d03808a435" FOREIGN KEY ("auctionId") REFERENCES "auctions" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "offers"("id", "bidPrice", "auctionId", "buyer", "createdAt") SELECT "id", "bidPrice", "auctionId", "buyer", "createdAt" FROM "temporary_offers"`);
        await queryRunner.query(`DROP TABLE "temporary_offers"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
