CREATE TABLE "player"
(
    "id"       SERIAL PRIMARY KEY,
    "username" VARCHAR(255),
    "ip"       VARCHAR(255)
);

CREATE TABLE "race"
(
    "id"        SERIAL PRIMARY KEY,
    "status"    VARCHAR(255) NOT NULL,
    "name"      VARCHAR(255),
    "tourCount" VARCHAR(255) NOT NULL,
    "winner"    VARCHAR(255),
    "duration"  INTEGER
);

CREATE TABLE "playerRace"
(
    "id"       SERIAL PRIMARY KEY,
    "playerId" INTEGER,
    "raceId"   INTEGER,
    FOREIGN KEY ("playerId") REFERENCES "player" ("id"),
    FOREIGN KEY ("raceId") REFERENCES "race" ("id")
);

INSERT INTO "player" ("username", "ip") VALUES ('victo', '192.168.13.12');
INSERT INTO "player" ("username", "ip") VALUES ('alex', '192.168.13.13');
INSERT INTO "player" ("username", "ip") VALUES ('maria', '192.168.13.14');
INSERT INTO "player" ("username", "ip") VALUES ('john', '192.168.13.15');
INSERT INTO "player" ("username", "ip") VALUES ('sophie', '192.168.13.16');
INSERT INTO "player" ("username", "ip") VALUES ('julien', '192.168.13.17');
INSERT INTO "player" ("username", "ip") VALUES ('amelie', '192.168.13.18');
INSERT INTO "player" ("username", "ip") VALUES ('nina', '192.168.13.19');
INSERT INTO "player" ("username", "ip") VALUES ('lucas', '192.168.13.20');
INSERT INTO "player" ("username", "ip") VALUES ('lisa', '192.168.13.21');
INSERT INTO "player" ("username", "ip") VALUES ('paul', '192.168.13.22');
INSERT INTO "player" ("username", "ip") VALUES ('emma', '192.168.13.23');
INSERT INTO "player" ("username", "ip") VALUES ('noah', '192.168.13.24');
INSERT INTO "player" ("username", "ip") VALUES ('leo', '192.168.13.25');
INSERT INTO "player" ("username", "ip") VALUES ('claire', '192.168.13.26');
INSERT INTO "player" ("username", "ip") VALUES ('nathan', '192.168.13.27');
INSERT INTO "player" ("username", "ip") VALUES ('julie', '192.168.13.28');
INSERT INTO "player" ("username", "ip") VALUES ('maxime', '192.168.13.29');
INSERT INTO "player" ("username", "ip") VALUES ('alice', '192.168.13.30');
INSERT INTO "player" ("username", "ip") VALUES ('thomas', '192.168.13.31');

INSERT INTO "race" ("status", "name", "tourCount", "winner") VALUES ('finished', 'Race1', '3', 'victo');
INSERT INTO "race" ("status", "name", "tourCount", "winner") VALUES ('finished', 'Race2', '5', 'alex');
INSERT INTO "race" ("status", "name", "tourCount", "winner") VALUES ('finished', 'Race3', '4', 'maria');
INSERT INTO "race" ("status", "name", "tourCount", "winner") VALUES ('finished', 'Race4', '6', 'victo');
INSERT INTO "race" ("status", "name", "tourCount", "winner") VALUES ('finished', 'Race5', '3', 'john');
INSERT INTO "race" ("status", "name", "tourCount", "winner") VALUES ('finished', 'Race6', '7', 'sophie');
INSERT INTO "race" ("status", "name", "tourCount", "winner") VALUES ('finished', 'Race7', '2', 'julien');
INSERT INTO "race" ("status", "name", "tourCount", "winner") VALUES ('finished', 'Race8', '5', 'julien');
INSERT INTO "race" ("status", "name", "tourCount", "winner") VALUES ('finished', 'Race9', '4', 'amelie');
INSERT INTO "race" ("status", "name", "tourCount", "winner") VALUES ('finished', 'Race10', '6', 'nina');

INSERT INTO "playerRace" ("playerId", "raceId") VALUES (1, 1);  -- victo participe à Race1
INSERT INTO "playerRace" ("playerId", "raceId") VALUES (2, 1);  -- alex participe à Race1
INSERT INTO "playerRace" ("playerId", "raceId") VALUES (3, 2);  -- maria participe à Race2
INSERT INTO "playerRace" ("playerId", "raceId") VALUES (4, 2);  -- john participe à Race2
INSERT INTO "playerRace" ("playerId", "raceId") VALUES (5, 3);  -- sophie participe à Race3
INSERT INTO "playerRace" ("playerId", "raceId") VALUES (6, 3);  -- julien participe à Race3
INSERT INTO "playerRace" ("playerId", "raceId") VALUES (7, 4);  -- amelie participe à Race4
INSERT INTO "playerRace" ("playerId", "raceId") VALUES (8, 4);  -- nina participe à Race4
INSERT INTO "playerRace" ("playerId", "raceId") VALUES (9, 5);  -- lucas participe à Race5
INSERT INTO "playerRace" ("playerId", "raceId") VALUES (10, 5); -- lisa participe à Race5
INSERT INTO "playerRace" ("playerId", "raceId") VALUES (11, 6); -- paul participe à Race6
INSERT INTO "playerRace" ("playerId", "raceId") VALUES (12, 6); -- emma participe à Race6
INSERT INTO "playerRace" ("playerId", "raceId") VALUES (13, 7); -- noah participe à Race7
INSERT INTO "playerRace" ("playerId", "raceId") VALUES (14, 7); -- leo participe à Race7
INSERT INTO "playerRace" ("playerId", "raceId") VALUES (15, 8); -- claire participe à Race8
INSERT INTO "playerRace" ("playerId", "raceId") VALUES (16, 8); -- nathan participe à Race8
INSERT INTO "playerRace" ("playerId", "raceId") VALUES (17, 9); -- julie participe à Race9
INSERT INTO "playerRace" ("playerId", "raceId") VALUES (18, 9); -- maxime participe à Race9
INSERT INTO "playerRace" ("playerId", "raceId") VALUES (19, 10);-- alice participe à Race10
INSERT INTO "playerRace" ("playerId", "raceId") VALUES (20, 10);-- thomas participe à Race10
INSERT INTO "playerRace" ("playerId", "raceId") VALUES (1, 4);  -- victo participe à Race4
INSERT INTO "playerRace" ("playerId", "raceId") VALUES (2, 5);  -- alex participe à Race5
INSERT INTO "playerRace" ("playerId", "raceId") VALUES (3, 6);  -- maria participe à Race6
INSERT INTO "playerRace" ("playerId", "raceId") VALUES (4, 7);  -- john participe à Race7
INSERT INTO "playerRace" ("playerId", "raceId") VALUES (5, 8);  -- sophie participe à Race8
INSERT INTO "playerRace" ("playerId", "raceId") VALUES (6, 9);  -- julien participe à Race9
INSERT INTO "playerRace" ("playerId", "raceId") VALUES (7, 10); -- amelie participe à Race10
