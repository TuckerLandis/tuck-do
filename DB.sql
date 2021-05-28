CREATE TABLE "tasks" (
"id" SERIAL PRIMARY KEY,
"text" VARCHAR(250) NOT NULL,
"complete" BOOLEAN DEFAULT false
);

INSERT INTO "tasks"
("text", "complete")
VALUES
('make this app', false);

SELECT * FROM "tasks";