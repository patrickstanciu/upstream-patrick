DROP TABLE IF EXISTS "emails";
DROP TABLE IF EXISTS "messages";
DROP TABLE IF EXISTS "threads";
DROP TABLE IF EXISTS "users";

CREATE TABLE IF NOT EXISTS "emails" (
	"id"	INTEGER NOT NULL,
	"universal_message_id"	TEXT NOT NULL,
	"in_reply_to"	TEXT,
	"mailserver_id"	TEXT NOT NULL,
	"from"	TEXT NOT NULL,
	"to"	TEXT,
	"cc"	TEXT,
	"body"	TEXT NOT NULL,
	"subject"	TEXT,
	"date"	INTEGER NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);

CREATE TABLE IF NOT EXISTS "messages" (
	"id"	INTEGER NOT NULL,
	"sender_id"	INTEGER,
	"thread_id"	INTEGER NOT NULL,
	"email_id"	INTEGER NOT NULL,
	"body"	TEXT NOT NULL,
	"date"	INTEGER NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("sender_id") REFERENCES "users"("id")
    FOREIGN KEY("thread_id") REFERENCES "threads"("id")
    FOREIGN KEY("email_id") REFERENCES "emails"("id")
);

CREATE TABLE IF NOT EXISTS "threads" (
	"id"	INTEGER NOT NULL,
	"name"	TEXT,
	PRIMARY KEY("id" AUTOINCREMENT)
);

CREATE TABLE IF NOT EXISTS "users" (
	"id"	INTEGER,
	"display_name"	TEXT,
	"email"	TEXT,
	PRIMARY KEY("id" AUTOINCREMENT)
);

INSERT INTO "users" ("display_name", "email") VALUES ('James Wilson', 'james.wilson@techsolutions.inc');
INSERT INTO "users" ("display_name", "email") VALUES ('Albert Wesker', 'albert@biogenlabs.com');
INSERT INTO "users" ("display_name", "email") VALUES ('Sohpie White', 'sophie.white@autodrive.motors');
INSERT INTO "users" ("display_name", "email") VALUES ('Rachel Green', 'rachel.green@techsolutions.inc');
INSERT INTO "users" ("display_name", "email") VALUES ('Sophie White', 'sophie.white@autodrive.motors');
INSERT INTO "users" ("display_name", "email") VALUES ('Benjamin Tree', 'benjamin.tree@earthsustain.org');
INSERT INTO "users" ("display_name", "email") VALUES ('Ava Sky', 'ava.sky@starnet.tech');
INSERT INTO "users" ("display_name", "email") VALUES ('Chris Blue', 'chris.blue@starnet.tech');