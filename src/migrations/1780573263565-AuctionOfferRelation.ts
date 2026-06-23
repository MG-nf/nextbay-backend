import { MigrationInterface, QueryRunner } from "typeorm";

export class AuctionOfferRelation1780573263565 implements MigrationInterface {
    name = 'AuctionOfferRelation1780573263565'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_offers" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "bidPrice" numeric, "auctionId" numeric NOT NULL, "buyer" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "temporary_offers"("id", "bidPrice", "auctionId", "buyer", "createdAt") SELECT "id", "bidPrice", "auctionId", "buyer", "createdAt" FROM "offers"`);
        await queryRunner.query(`DROP TABLE "offers"`);
        await queryRunner.query(`ALTER TABLE "temporary_offers" RENAME TO "offers"`);
        await queryRunner.query(`CREATE TABLE "temporary_offers" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "bidPrice" numeric, "auctionId" integer NOT NULL, "buyer" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "temporary_offers"("id", "bidPrice", "auctionId", "buyer", "createdAt") SELECT "id", "bidPrice", "auctionId", "buyer", "createdAt" FROM "offers"`);
        await queryRunner.query(`DROP TABLE "offers"`);
        await queryRunner.query(`ALTER TABLE "temporary_offers" RENAME TO "offers"`);
        await queryRunner.query(`CREATE TABLE "temporary_auctions" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "startingPrice" numeric, "currentPrice" numeric, "endDate" datetime NOT NULL, "seller" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "temporary_auctions"("id", "title", "description", "startingPrice", "currentPrice", "endDate", "seller", "createdAt") SELECT "id", "title", "description", "startingPrice", "currentPrice", "endDate", "seller", "createdAt" FROM "auctions"`);
        await queryRunner.query(`DROP TABLE "auctions"`);
        await queryRunner.query(`ALTER TABLE "temporary_auctions" RENAME TO "auctions"`);
        await queryRunner.query(`CREATE TABLE "temporary_offers" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "bidPrice" numeric, "auctionId" integer NOT NULL, "buyer" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "FK_9efdf260cd45b23f2d03808a435" FOREIGN KEY ("auctionId") REFERENCES "auctions" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_offers"("id", "bidPrice", "auctionId", "buyer", "createdAt") SELECT "id", "bidPrice", "auctionId", "buyer", "createdAt" FROM "offers"`);
        await queryRunner.query(`DROP TABLE "offers"`);
        await queryRunner.query(`ALTER TABLE "temporary_offers" RENAME TO "offers"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "offers" RENAME TO "temporary_offers"`);
        await queryRunner.query(`CREATE TABLE "offers" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "bidPrice" numeric, "auctionId" integer NOT NULL, "buyer" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "offers"("id", "bidPrice", "auctionId", "buyer", "createdAt") SELECT "id", "bidPrice", "auctionId", "buyer", "createdAt" FROM "temporary_offers"`);
        await queryRunner.query(`DROP TABLE "temporary_offers"`);
        await queryRunner.query(`ALTER TABLE "auctions" RENAME TO "temporary_auctions"`);
        await queryRunner.query(`CREATE TABLE "auctions" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "startingPrice" numeric, "currentPrice" numeric, "endDate" datetime NOT NULL, "seller" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "auctions"("id", "title", "description", "startingPrice", "currentPrice", "endDate", "seller", "createdAt") SELECT "id", "title", "description", "startingPrice", "currentPrice", "endDate", "seller", "createdAt" FROM "temporary_auctions"`);
        await queryRunner.query(`DROP TABLE "temporary_auctions"`);
        await queryRunner.query(`ALTER TABLE "offers" RENAME TO "temporary_offers"`);
        await queryRunner.query(`CREATE TABLE "offers" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "bidPrice" numeric, "auctionId" numeric NOT NULL, "buyer" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "offers"("id", "bidPrice", "auctionId", "buyer", "createdAt") SELECT "id", "bidPrice", "auctionId", "buyer", "createdAt" FROM "temporary_offers"`);
        await queryRunner.query(`DROP TABLE "temporary_offers"`);
        await queryRunner.query(`ALTER TABLE "offers" RENAME TO "temporary_offers"`);
        await queryRunner.query(`CREATE TABLE "offers" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "bidPrice" numeric, "auctionId" numeric NOT NULL, "buyer" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "offers"("id", "bidPrice", "auctionId", "buyer", "createdAt") SELECT "id", "bidPrice", "auctionId", "buyer", "createdAt" FROM "temporary_offers"`);
        await queryRunner.query(`DROP TABLE "temporary_offers"`);
    }

}
