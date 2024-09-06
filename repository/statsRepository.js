export async function playerStats(req) {
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

  return player.rows[0];
}

export async function generalStats(req) {
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

  return statsGeneral.rows;
}
