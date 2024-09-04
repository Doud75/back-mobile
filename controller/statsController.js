import {getSocketIOInstance} from "../socket.js";

export async function getStats(req, res) {
  try {
    const playerId = req.params.playerId;
    const player = await req.server.pg.query(`
          SELECT 
            p."username",
            (SELECT COUNT("playerRace"."id") FROM "playerRace" WHERE "playerRace"."playerId" = p."id") as nbRace,
            (SELECT COUNT("race"."id") FROM "race" WHERE "race"."winner" = p."username") as nbVictory,
            (SELECT FLOOR(AVG("race"."duration")) FROM "race" JOIN "playerRace" ON p."id" = "playerRace"."playerId" AND "playerRace"."raceId" = race."id") as avgDuration,
            (
              SELECT FLOOR (
                (
                  SELECT AVG("race"."duration") 
                  FROM "race" 
                    JOIN "playerRace" ON p."id" = "playerRace"."playerId"
                    AND "playerRace"."raceId" = race."id"
                ) / (
                  SELECT SUM(CAST("race"."tourCount" as INT)) 
                  FROM "race" 
                    JOIN "playerRace" ON p."id" = "playerRace"."playerId"
                    AND "playerRace"."raceId" = race."id"
                )
              )
            ) as avgDurationPerTour
          FROM "player" p
          WHERE p."id" = $1;
        `, [playerId]);
    if (player.rows.length > 0) {
        const statsGeneral = await req.server.pg.query(`
          SELECT 
            p."username",
            (SELECT COUNT("playerRace"."id") FROM "playerRace" WHERE "playerRace"."playerId" = p."id") as nbRace,
            (SELECT COUNT("race"."id") FROM "race" WHERE "race"."winner" = p."username") as nbVictory,
            (SELECT FLOOR(AVG("race"."duration")) FROM "race" JOIN "playerRace" ON p."id" = "playerRace"."playerId" AND "playerRace"."raceId" = race."id") as avgDuration
          FROM "player" p
          ORDER BY nbVictory DESC
          LIMIT 3
          ;`);
        res.send({
          player : player.rows[0],
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
        // const result = await req.server.pg.query(`
        //   SELECT "player"."username", count(r."winner") as nbRace
        //   FROM "player"
        //     LEFT JOIN "race" AS r ON "player"."username" = r."winner"
        //     WHERE "player"."id" = 1
        //   GROUP BY "player"."username";
        // `);
        const result = await req.server.pg.query(`
          SELECT 
            p."username",
            (SELECT COUNT("playerRace"."id") FROM "playerRace" WHERE "playerRace"."playerId" = p."id") as nbRace,
            (SELECT COUNT("race"."id") FROM "race" WHERE "race"."winner" = p."username") as nbVictory,
            (SELECT FLOOR(AVG("race"."duration")) FROM "race" JOIN "playerRace" ON p."id" = "playerRace"."playerId" AND "playerRace"."raceId" = race."id") as avgDuration,
            (
              SELECT FLOOR (
                (
                  SELECT AVG("race"."duration") 
                  FROM "race" 
                    JOIN "playerRace" ON p."id" = "playerRace"."playerId"
                    AND "playerRace"."raceId" = race."id"
                ) / (
                  SELECT SUM(CAST("race"."tourCount" as INT)) 
                  FROM "race" 
                    JOIN "playerRace" ON p."id" = "playerRace"."playerId"
                    AND "playerRace"."raceId" = race."id"
                )
              )
            ) as avgDurationPerTour
          FROM "player" p
          ORDER BY nbVictory DESC
          LIMIT 3;
        `);
        res.send(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal Server Error' });
    }
}
