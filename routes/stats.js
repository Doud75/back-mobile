import { getStats } from "../controller/statsController.js"

export default async function (server) {
  server.get('/get-stats/:playerId', getStats)
}