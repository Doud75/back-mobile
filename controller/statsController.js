import {getSocketIOInstance} from "../socket.js";

export async function getStats(req, res) {
  try {
    // on recupere les parametres de la requete = un user id 
    // on regarde si le user existe
    // si il existe on recupere les stats du user (username, nb victoire, pour chaque course la durée et le nom du gagnant)
        // on recupere les stats générales (top 3 joueurs avec le plus de victoires)
    // sinon on renvoie une erreur
    const playerId = req.params.playerId;
    const player = await req.server.pg.query('SELECT * FROM "player" WHERE id = $1', [playerId]);
    if (player.rows.length > 0) {
        // recupere les courses du user 
        const playerResult = await req.server.pg.query('SELECT * FROM "playerRace" WHERE "playerRace"."playerId" = $1', [playerId]);
        console.log(`Player races: ${JSON.stringify(playerResult.rows)}`);

        const top3 = await req.server.pg.query('\
          SELECT winner, COUNT(*) AS victories \
          FROM "race" \
          WHERE status = \'finished\' \
          GROUP BY winner \
          ORDER BY victories DESC\
          Limit 3;');
        res.send({
          playerStat : playerResult.rows,
          top3 : top3.rows
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
        // on recupere les stats de tous les joueurs
        // on recupere les stats générales (top 3 joueurs avec le plus de victoires)
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
