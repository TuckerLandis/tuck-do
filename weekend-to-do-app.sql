Below is the table creation statement i used. The database is named 'weekend-to-do-app'
I included 3 inserts, to test the 3 different display conditions, be sure to replace !TODAYS DATE! with todays date in the last one.


CREATE TABLE "tasks" (
"id" SERIAL PRIMARY KEY,
"text" VARCHAR(250) NOT NULL,
"dueDate" DATE,
"complete" BOOLEAN DEFAULT false,
"completeDate" DATE
);

INSERT INTO "tasks"
("text", "dueDate", "complete", "completeDate")
VALUES
('Make this app', '05/31/2021', true, '05/31/2021');

INSERT INTO "tasks"
("text", "dueDate", "complete",)
VALUES
('Get eggs', '06/06/2021', false);

INSERT INTO "tasks"
("text", "dueDate", "complete",)
VALUES
('Put the lime in the Coconut', !!!TODAYS DATE!!!!, false);