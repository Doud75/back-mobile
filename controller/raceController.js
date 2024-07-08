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
  const {raceId} = req.body;
  const io = getSocketIOInstance()
  io.to(raceId).emit('newMessage', 'ping');
  console.log(raceId);
  res.send('ok');
}
