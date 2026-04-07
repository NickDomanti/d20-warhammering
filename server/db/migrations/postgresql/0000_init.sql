CREATE TABLE "battles" (
	"id" serial PRIMARY KEY NOT NULL,
	"budget" integer NOT NULL,
	"player1" text NOT NULL,
	"player1_points" integer NOT NULL,
	"player2" text NOT NULL,
	"player2_points" integer NOT NULL,
	"date" date NOT NULL
);
--> statement-breakpoint
CREATE TABLE "players" (
	"name" text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
ALTER TABLE "battles" ADD CONSTRAINT "battles_player1_players_name_fk" FOREIGN KEY ("player1") REFERENCES "public"."players"("name") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "battles" ADD CONSTRAINT "battles_player2_players_name_fk" FOREIGN KEY ("player2") REFERENCES "public"."players"("name") ON DELETE no action ON UPDATE no action;