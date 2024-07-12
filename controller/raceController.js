import {getSocketIOInstance} from "../socket.js";

export async function createRace(req, res) {
  const {raceName, tourCount} = req.body;
  try {
    const raceResult = await req.server.pg.query(
      'INSERT INTO "race" ("name", "tourCount", "status") VALUES ($1, $2, \'pending\') RETURNING id',
      [raceName, tourCount]
    );
    const raceId = raceResult.rows[0].id;
    console.log(raceResult.rows[0])
    res.send({raceId});
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Internal Server Error' });
  }
}

export async function joinRace(req, res) {
  const {raceId, formData} = req.body;
  const playerRace = await req.server.pg.query(
    'INSERT INTO "playerRace" ("raceId", "playerId") VALUES ($1, $2) RETURNING id',
    [raceId, formData.id]
  );
  const playerRaceId = playerRace.rows[0].id
  const numberOfPlayer = await req.server.pg.query(
    'SELECT count(*) FROM "playerRace" WHERE "playerRace".id = $1',
    [playerRaceId]
  );
  if (numberOfPlayer.rows[0].count === 2) {
    await req.server.pg.query(
      'UPDATE "race" SET "status" = \'ongoing\' WHERE "id" = $1',
      [raceId]
    );
  }
  const response = {
    playerInfo: formData,
    numberOfPlayer: numberOfPlayer.rows[0].count
  }
  const io = getSocketIOInstance()
  io.to(Number(raceId)).emit('newMessage', response);
  res.send({
    numberOfPlayer: numberOfPlayer.rows[0].count
  });
}

export async function getPendingRace(req, res) {
  const result = await req.server.pg.query('SELECT * FROM "race" WHERE status = \'pending\'');
  res.send(result.rows);
}

export async function closeRace(req, res) {
  const {raceId} = req.body;
  console.log('from close race : ', raceId)
  const raceResult = await req.server.pg.query(
    'UPDATE "race" SET "status" = \'close\' WHERE "id" = $1 RETURNING id',
    [raceId]
  );
  const response = {
    courseStatus: 'close'
  }
  const io = getSocketIOInstance()
  io.to(Number(raceId)).emit('newMessage', response);
  res.send(raceResult.rows[0]);
}

export async function stopRace(req, res) {
  const {raceId, winner, raceDuration} = req.body;
  console.log('from stoped race : ', winner)
  const raceResult = await req.server.pg.query(
    'UPDATE "race" SET "winner" = $1, "duration" = $2 WHERE "id" = $3 RETURNING id',
    [winner, raceDuration, raceId]
  );
  const response = {
    courseStatus: 'stoped and winner seted'
  }
  const io = getSocketIOInstance()
  io.to(Number(raceId)).emit('newMessage', response);
  res.send(raceResult.rows[0]);
}
