CREATE TABLE "d20_warhammering"."battles" (
	"id" serial PRIMARY KEY NOT NULL,
	"budget" integer NOT NULL,
	"date" date NOT NULL,
	"player1" text NOT NULL,
	"player1_points" integer NOT NULL,
	"player1_faction" text NOT NULL,
	"player2" text NOT NULL,
	"player2_points" integer NOT NULL,
	"player2_faction" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "d20_warhammering"."players" (
	"name" text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
ALTER TABLE "d20_warhammering"."battles" ADD CONSTRAINT "battles_player1_players_name_fk" FOREIGN KEY ("player1") REFERENCES "d20_warhammering"."players"("name") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "d20_warhammering"."battles" ADD CONSTRAINT "battles_player2_players_name_fk" FOREIGN KEY ("player2") REFERENCES "d20_warhammering"."players"("name") ON DELETE no action ON UPDATE no action;