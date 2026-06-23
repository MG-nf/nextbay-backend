import { MigrationInterface, QueryRunner } from "typeorm";

export class UserAuctionOfferRelations1780663453230 implements MigrationInterface {
    name = 'UserAuctionOfferRelations1780663453230'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_offers" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "bidPrice" numeric, "auctionId" integer NOT NULL, "buyerId" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "FK_9efdf260cd45b23f2d03808a435" FOREIGN KEY ("auctionId") REFERENCES "auctions" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_offers"("id", "bidPrice", "auctionId", "buyerId", "createdAt") SELECT "id", "bidPrice", "auctionId", "buyer", "createdAt" FROM "offers"`);
        await queryRunner.query(`DROP TABLE "offers"`);
        await queryRunner.query(`ALTER TABLE "temporary_offers" RENAME TO "offers"`);
        await queryRunner.query(`CREATE TABLE "temporary_auctions" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "startingPrice" numeric NOT NULL, "currentPrice" numeric NOT NULL, "endDate" datetime NOT NULL, "sellerId" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "temporary_auctions"("id", "title", "description", "startingPrice", "currentPrice", "endDate", "sellerId", "createdAt") SELECT "id", "title", "description", "startingPrice", "currentPrice", "endDate", "seller", "createdAt" FROM "auctions"`);
        await queryRunner.query(`DROP TABLE "auctions"`);
        await queryRunner.query(`ALTER TABLE "temporary_auctions" RENAME TO "auctions"`);
        await queryRunner.query(`CREATE TABLE "temporary_offers" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "bidPrice" numeric, "auctionId" integer NOT NULL, "buyerId" integer NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "FK_9efdf260cd45b23f2d03808a435" FOREIGN KEY ("auctionId") REFERENCES "auctions" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_offers"("id", "bidPrice", "auctionId", "buyerId", "createdAt") SELECT "id", "bidPrice", "auctionId", "buyerId", "createdAt" FROM "offers"`);
        await queryRunner.query(`DROP TABLE "offers"`);
        await queryRunner.query(`ALTER TABLE "temporary_offers" RENAME TO "offers"`);
        await queryRunner.query(`CREATE TABLE "temporary_auctions" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "startingPrice" numeric NOT NULL, "currentPrice" numeric NOT NULL, "endDate" datetime NOT NULL, "sellerId" integer NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "temporary_auctions"("id", "title", "description", "startingPrice", "currentPrice", "endDate", "sellerId", "createdAt") SELECT "id", "title", "description", "startingPrice", "currentPrice", "endDate", "sellerId", "createdAt" FROM "auctions"`);
        await queryRunner.query(`DROP TABLE "auctions"`);
        await queryRunner.query(`ALTER TABLE "temporary_auctions" RENAME TO "auctions"`);
        await queryRunner.query(`CREATE TABLE "temporary_offers" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "bidPrice" numeric, "auctionId" integer NOT NULL, "buyerId" integer NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "FK_9efdf260cd45b23f2d03808a435" FOREIGN KEY ("auctionId") REFERENCES "auctions" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_31bca9f7753201479da158d51a3" FOREIGN KEY ("buyerId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_offers"("id", "bidPrice", "auctionId", "buyerId", "createdAt") SELECT "id", "bidPrice", "auctionId", "buyerId", "createdAt" FROM "offers"`);
        await queryRunner.query(`DROP TABLE "offers"`);
        await queryRunner.query(`ALTER TABLE "temporary_offers" RENAME TO "offers"`);
        await queryRunner.query(`CREATE TABLE "temporary_auctions" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "startingPrice" numeric NOT NULL, "currentPrice" numeric NOT NULL, "endDate" datetime NOT NULL, "sellerId" integer NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "FK_7562985483a1d83d0790b19d186" FOREIGN KEY ("sellerId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_auctions"("id", "title", "description", "startingPrice", "currentPrice", "endDate", "sellerId", "createdAt") SELECT "id", "title", "description", "startingPrice", "currentPrice", "endDate", "sellerId", "createdAt" FROM "auctions"`);
        await queryRunner.query(`DROP TABLE "auctions"`);
        await queryRunner.query(`ALTER TABLE "temporary_auctions" RENAME TO "auctions"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auctions" RENAME TO "temporary_auctions"`);
        await queryRunner.query(`CREATE TABLE "auctions" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "startingPrice" numeric NOT NULL, "currentPrice" numeric NOT NULL, "endDate" datetime NOT NULL, "sellerId" integer NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "auctions"("id", "title", "description", "startingPrice", "currentPrice", "endDate", "sellerId", "createdAt") SELECT "id", "title", "description", "startingPrice", "currentPrice", "endDate", "sellerId", "createdAt" FROM "temporary_auctions"`);
        await queryRunner.query(`DROP TABLE "temporary_auctions"`);
        await queryRunner.query(`ALTER TABLE "offers" RENAME TO "temporary_offers"`);
        await queryRunner.query(`CREATE TABLE "offers" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "bidPrice" numeric, "auctionId" integer NOT NULL, "buyerId" integer NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "FK_9efdf260cd45b23f2d03808a435" FOREIGN KEY ("auctionId") REFERENCES "auctions" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "offers"("id", "bidPrice", "auctionId", "buyerId", "createdAt") SELECT "id", "bidPrice", "auctionId", "buyerId", "createdAt" FROM "temporary_offers"`);
        await queryRunner.query(`DROP TABLE "temporary_offers"`);
        await queryRunner.query(`ALTER TABLE "auctions" RENAME TO "temporary_auctions"`);
        await queryRunner.query(`CREATE TABLE "auctions" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "startingPrice" numeric NOT NULL, "currentPrice" numeric NOT NULL, "endDate" datetime NOT NULL, "sellerId" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "auctions"("id", "title", "description", "startingPrice", "currentPrice", "endDate", "sellerId", "createdAt") SELECT "id", "title", "description", "startingPrice", "currentPrice", "endDate", "sellerId", "createdAt" FROM "temporary_auctions"`);
        await queryRunner.query(`DROP TABLE "temporary_auctions"`);
        await queryRunner.query(`ALTER TABLE "offers" RENAME TO "temporary_offers"`);
        await queryRunner.query(`CREATE TABLE "offers" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "bidPrice" numeric, "auctionId" integer NOT NULL, "buyerId" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "FK_9efdf260cd45b23f2d03808a435" FOREIGN KEY ("auctionId") REFERENCES "auctions" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "offers"("id", "bidPrice", "auctionId", "buyerId", "createdAt") SELECT "id", "bidPrice", "auctionId", "buyerId", "createdAt" FROM "temporary_offers"`);
        await queryRunner.query(`DROP TABLE "temporary_offers"`);
        await queryRunner.query(`ALTER TABLE "auctions" RENAME TO "temporary_auctions"`);
        await queryRunner.query(`CREATE TABLE "auctions" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "startingPrice" numeric NOT NULL, "currentPrice" numeric NOT NULL, "endDate" datetime NOT NULL, "seller" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "auctions"("id", "title", "description", "startingPrice", "currentPrice", "endDate", "seller", "createdAt") SELECT "id", "title", "description", "startingPrice", "currentPrice", "endDate", "sellerId", "createdAt" FROM "temporary_auctions"`);
        await queryRunner.query(`DROP TABLE "temporary_auctions"`);
        await queryRunner.query(`ALTER TABLE "offers" RENAME TO "temporary_offers"`);
        await queryRunner.query(`CREATE TABLE "offers" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "bidPrice" numeric, "auctionId" integer NOT NULL, "buyer" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "FK_9efdf260cd45b23f2d03808a435" FOREIGN KEY ("auctionId") REFERENCES "auctions" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "offers"("id", "bidPrice", "auctionId", "buyer", "createdAt") SELECT "id", "bidPrice", "auctionId", "buyerId", "createdAt" FROM "temporary_offers"`);
        await queryRunner.query(`DROP TABLE "temporary_offers"`);
    }

}
