export async function getPlayerByUserName(req) {
  const {username} = req.body;
  const playerResult = await req.server.pg.query('SELECT * FROM "player" WHERE username = $1', [username]);

  return playerResult.rows[0];
}

export async function newPlayer(req) {
  const {ip, username} = req.body;
  const insertResult = await req.server.pg.query(
    'INSERT INTO "player" (username, ip) VALUES ($1, $2) RETURNING *',
    [username, ip]
  );

  return insertResult.rows[0];
}
