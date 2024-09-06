import {pendingRace} from "../controller/raceController.js";

export async function newRace(req) {
  const {raceName, tourCount} = req.body;
  const raceResult = await req.server.pg.query(
    'INSERT INTO "race" ("name", "tourCount", "status") VALUES ($1, $2, \'pending\') RETURNING id',
    [raceName, tourCount]
  );
  return raceResult.rows[0].id;
}

export async function playerJoinRace(req) {
  const {raceId, formData} = req.body;
  const playerRace = await req.server.pg.query(
    'INSERT INTO "playerRace" ("raceId", "playerId") VALUES ($1, $2) RETURNING id',
    [raceId, formData.id]
  );
  return playerRace.rows[0].id;
}

export async function getNumberOfPlayer(req, playerRaceId) {
  const numberOfPlayer = await req.server.pg.query(
    'SELECT count(*) FROM "playerRace" WHERE "playerRace".id = $1',
    [playerRaceId]
  );
  return parseInt(numberOfPlayer.rows[0].count);
}

export async function changeRaceStatus(req, status) {
  const {raceId} = req.body;
  await req.server.pg.query(
    'UPDATE "race" SET "status" = $1 WHERE "id" = $2',
    [status, raceId]
  );
}

export async function getPendingRace(req) {
  const pendingRace = await req.server.pg.query('SELECT * FROM "race" WHERE status = \'pending\'');
  return pendingRace.rows;
}

export async function setEndingRace(req) {
  const {raceId, winner, raceDuration} = req.body;
  const raceResult = await req.server.pg.query(
    'UPDATE "race" SET "winner" = $1, "duration" = $2 WHERE "id" = $3 RETURNING id',
    [winner, raceDuration, raceId]
  );

  return raceResult.rows[0];
}
