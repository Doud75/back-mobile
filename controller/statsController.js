import {getSocketIOInstance} from "../socket.js";

export async function getStats(req, res) {
  try {
    // on recupere les parametres de la requete = un user id 
    // on regarde si le user existe
    // si il existe on recupere les stats du user (username, nb victoire, pour chaque course la durée et le nom du gagnant)
        // on recupere les stats générales (top 3 joueurs avec le plus de victoires)
    // sinon on renvoie une erreur
    const playerId = req.params.playerId;
    const playerResult = await req.server.pg.query('SELECT * FROM "player" WHERE id = $1', [playerId]);
    if (playerResult.rows.length > 0) {
        res.send(playerResult.rows);
    }
    else {
      return res.status(404).send({ error: 'Player not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Internal Server Error' });
  }
}