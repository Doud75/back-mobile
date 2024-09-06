import {playerStats, generalStats} from '../repository/statsRepository.js'

export async function getStatsByUser(req, res) {
  try {
    const player = await playerStats(req)
    res.send({
      player : player,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Internal Server Error' });
  }
}

export async function getAllStats(req, res) {
    try {
      const statsGeneral = await generalStats(req)
      res.send({
        statsGeneral : statsGeneral
      });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal Server Error' });
    }
}
