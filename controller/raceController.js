import {getSocketIOInstance} from "../socket.js";
import {
  newRace,
  playerJoinRace,
  getNumberOfPlayer,
  getPendingRace,
  changeRaceStatus,
  setEndingRace
} from "../repository/raceRepository.js";

export async function createRace(req, res) {
  try {
    const raceId = await newRace(req);
    res.send({raceId});
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Internal Server Error' });
  }
}

export async function joinRace(req, res) {
  const playerRaceId = await playerJoinRace(req);
  const numberOfPlayer = await getNumberOfPlayer(req, playerRaceId);
  if (numberOfPlayer === 1) {
    await changeRaceStatus(req, 'ongoing');
  }
  const response = {
    playerInfo: req.body.formData,
    numberOfPlayer: numberOfPlayer
  }
  const io = getSocketIOInstance()
  io.to(Number(req.body.raceId)).emit('newMessage', response);
  res.send({
    numberOfPlayer: numberOfPlayer
  });
}

export async function pendingRace(req, res) {
  const pendingRace = await getPendingRace(req);
  res.send(pendingRace);
}

export async function closeRace(req, res) {
  const {raceId} = req.body;
  await changeRaceStatus(req, 'close');
  const response = {
    courseStatus: 'close'
  }
  const io = getSocketIOInstance()
  io.to(Number(raceId)).emit('newMessage', response);
  res.send({id: raceId});
}

export async function stopRace(req, res) {
  const raceResult = await setEndingRace(req);
  const response = {
    courseStatus: 'stoped and winner seted'
  }
  const io = getSocketIOInstance()
  io.to(Number(req.body.raceId)).emit('newMessage', response);
  res.send(raceResult);
}
