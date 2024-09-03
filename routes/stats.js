import { getStats, getAllStats } from "../controller/statsController.js"

export default async function (server) {
  server.get('/get-stats/:playerId', getStats)
  server.get('/get-all-stats', getAllStats)
}