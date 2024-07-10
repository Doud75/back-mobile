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
    "winner"    VARCHAR(255)
);

CREATE TABLE "playerRace"
(
    "id"        SERIAL PRIMARY KEY,
    "playerId"  INTEGER,
    "raceId"  INTEGER,
    FOREIGN KEY ("playerId") REFERENCES "player"("id"),
    FOREIGN KEY ("raceId") REFERENCES "race"("id")
);

INSERT INTO "player" ("username", "ip")
VALUES ('victo', '192.168.13.12');
