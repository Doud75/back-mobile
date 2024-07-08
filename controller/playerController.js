import pool from "pg/lib/client.js";

export async function getPlayer(req, res) {
  try {
    const result = await req.server.pg.query('SELECT * FROM "player"');
    res.send(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Internal Server Error' });
  }
}


export function getOnePlayer(req, res) {
  res.send({hello: 'getOnePlayer'});
}

export async function signIn(req, res) {
  try {
    console.log('back')
    const { username, ip } = req.body;
    
    const playerResult = await req.server.pg.query('SELECT * FROM "player" WHERE username = $1', [username]);

    if (playerResult.rows.length > 0) {
      console.log("player exists");
      return res.status(200).send({ response: 'Un joueur est déjà existant', data: playerResult.rows[0] });
    } else {
      const insertResult = await req.server.pg.query(
          'INSERT INTO "player" (username, ip) VALUES ($1, $2) RETURNING *',
          [username, ip]
      );
      console.log("new player created");
      return res.status(200).send({ response: 'Nouveau profil créé', data: insertResult.rows[0] });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: 'Internal Server Error' });
  }
}