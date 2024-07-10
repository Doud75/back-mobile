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
  console.log(raceId);
  console.log(formData);
  const io = getSocketIOInstance()
  io.to(Number(raceId)).emit('newMessage', formData);
  res.send({
    data: 'ok'
  });
}

export async function getPendingRace(req, res) {
  const result = await req.server.pg.query('SELECT * FROM "race" where status = \'pending\'');
  res.send(result.rows);
}

export async function closeRace(req, res) {
  const {raceId} = req.body;
  const raceResult = await req.server.pg.query(
    'UPDATE "race" SET "status" = \'close\' WHERE "id" = $1 RETURNING id',
    [raceId]
  );
  console.log(raceResult.rows[0])
  res.send(raceResult.rows[0]);
}
