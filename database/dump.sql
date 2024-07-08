CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "pwd" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255),
    "profilePic" VARCHAR(255),
    "email" VARCHAR(255)
);

CREATE TABLE "race" (
    "id" SERIAL PRIMARY KEY,
    "status" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255),
    "tourCount" VARCHAR(255) NOT NULL,
    "winner" VARCHAR(255)
);

INSERT INTO "user" ("pwd", "name", "profilePic", "email")
VALUES ('az', 'Pauline', '', 'pauli@mail.com');

INSERT INTO "user" ("pwd", "name", "profilePic", "email")
VALUES ('az', 'Adrien', '', 'adri@mail.com');

INSERT INTO "user" ("pwd", "name", "profilePic", "email")
VALUES ('az', 'Jules', '', 'jule@mail.com');

INSERT INTO "user" ("pwd", "name", "profilePic", "email")
VALUES ('az', 'Theo', '', 'theo@mail.com');

INSERT INTO "user" ("pwd", "name", "profilePic", "email")
VALUES ('az', 'Victorien', '', 'victorien@mail.com');

INSERT INTO "user" ("pwd", "name", "profilePic", "email")
VALUES ('az', 'Anthony', '', 'anthony@mail.com');

INSERT INTO "user" ("pwd", "name", "profilePic", "email")
VALUES ('az', 'JB', '', 'jb@mail.com');


