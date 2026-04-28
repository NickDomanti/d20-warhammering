CREATE TABLE "d20_warhammering"."seasons" (
	"name" text PRIMARY KEY NOT NULL,
	"description" text NOT NULL,
	"cover_image" text NOT NULL,
	"start_date" date,
	"end_date" date
);
--> statement-breakpoint
ALTER TABLE "d20_warhammering"."battles" DROP CONSTRAINT "battles_player1_players_name_fk";
--> statement-breakpoint
ALTER TABLE "d20_warhammering"."battles" DROP CONSTRAINT "battles_player2_players_name_fk";
--> statement-breakpoint
ALTER TABLE "d20_warhammering"."battles" ADD COLUMN "season" text;--> statement-breakpoint
ALTER TABLE "d20_warhammering"."battles" ADD CONSTRAINT "battles_season_seasons_name_fk" FOREIGN KEY ("season") REFERENCES "d20_warhammering"."seasons"("name") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "d20_warhammering"."battles" ADD CONSTRAINT "battles_player1_players_name_fk" FOREIGN KEY ("player1") REFERENCES "d20_warhammering"."players"("name") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "d20_warhammering"."battles" ADD CONSTRAINT "battles_player2_players_name_fk" FOREIGN KEY ("player2") REFERENCES "d20_warhammering"."players"("name") ON DELETE cascade ON UPDATE cascade;