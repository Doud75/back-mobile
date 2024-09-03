import {getSocketIOInstance} from "../socket.js";

export async function getStats(req, res) {
  try {
    const playerId = req.params.playerId;
    const player = await req.server.pg.query('\
      SELECT "player"."username", COUNT("playerRace"."id") as nbRace\
      FROM "player" \
      JOIN "playerRace" ON "player"."id" = "playerRace"."playerId" \
      WHERE "player"."id" = $1\
      GROUP BY "player"."username";\
      ', [playerId]);
    if (player.rows.length > 0) {
        const playerResult = await req.server.pg.query('\
          SELECT "race"."tourCount", "race"."name" \
          FROM "playerRace"\
          JOIN "race" ON "playerRace"."raceId" = "race"."id"\
          WHERE "playerRace"."playerId" = $1;', [playerId]);
        const statsGeneral = await req.server.pg.query('\
          SELECT winner, COUNT(*) AS victories \
          FROM "race" \
          WHERE status = \'finished\' \
          GROUP BY winner \
          ORDER BY victories DESC\
          Limit 3;');
        res.send({
          player : player.rows[0],
          playerStat : playerResult.rows,
          statsGeneral : statsGeneral.rows
        });
    }
    else {
      return res.status(404).send({ error: 'Player not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Internal Server Error' });
  }
}

export async function getAllStats(req, res) {
    try {
        const result = await req.server.pg.query('\
          SELECT winner, COUNT(*) AS victories \
          FROM "race" \
          WHERE status = \'finished\' \
          GROUP BY winner \
          ORDER BY victories DESC\
          Limit 3;');
        res.send(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal Server Error' });
    }
}
