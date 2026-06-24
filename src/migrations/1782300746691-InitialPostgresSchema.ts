import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialPostgresSchema1782300746691 implements MigrationInterface {
    name = 'InitialPostgresSchema1782300746691'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "offers" ("id" SERIAL NOT NULL, "bidPrice" numeric, "auctionId" integer NOT NULL, "buyerId" integer NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_4c88e956195bba85977da21b8f4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "auctions" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "startingPrice" numeric NOT NULL, "currentPrice" numeric NOT NULL, "endDate" TIMESTAMP WITH TIME ZONE NOT NULL, "sellerId" integer NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_87d2b34d4829f0519a5c5570368" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "offers" ADD CONSTRAINT "FK_9efdf260cd45b23f2d03808a435" FOREIGN KEY ("auctionId") REFERENCES "auctions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "offers" ADD CONSTRAINT "FK_31bca9f7753201479da158d51a3" FOREIGN KEY ("buyerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "auctions" ADD CONSTRAINT "FK_7562985483a1d83d0790b19d186" FOREIGN KEY ("sellerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auctions" DROP CONSTRAINT "FK_7562985483a1d83d0790b19d186"`);
        await queryRunner.query(`ALTER TABLE "offers" DROP CONSTRAINT "FK_31bca9f7753201479da158d51a3"`);
        await queryRunner.query(`ALTER TABLE "offers" DROP CONSTRAINT "FK_9efdf260cd45b23f2d03808a435"`);
        await queryRunner.query(`DROP TABLE "auctions"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "offers"`);
    }

}
