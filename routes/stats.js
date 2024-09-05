import { getStatsByUser, getAllStats } from "../controller/statsController.js"

export default async function (server) {
  server.get('/get-stats/:playerId', getStatsByUser)
  server.get('/get-all-stats', getAllStats)
}
