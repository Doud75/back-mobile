import {getPlayerByUserName, newPlayer} from '../repository/playerRepository.js'

export async function signIn(req, res) {
  try {
    const playerResult = await getPlayerByUserName(req)

    if (playerResult) {
      return res.status(200).send({ response: 'Un joueur est déjà existant', data: playerResult });
    } else {
      const insertResult = await newPlayer(req)
      return res.status(200).send({ response: 'Nouveau profil créé', data: insertResult });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: 'Internal Server Error' });
  }
}

