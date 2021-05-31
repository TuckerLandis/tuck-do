CREATE TABLE "tasks" (
"id" SERIAL PRIMARY KEY,
"text" VARCHAR(250) NOT NULL,
"dueDate" DATE,
"complete" BOOLEAN DEFAULT false,
"completeDate" DATE
);