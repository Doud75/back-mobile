import Fastify from 'fastify';
import process from 'process';
import playerRoute from './routes/player.js';
import raceRoute from './routes/race.js';
import statsRoute from './routes/stats.js';
import fastifyPostgres from '@fastify/postgres';
import config from './config.json' assert { type: 'json' };
import http from 'http';
import { initializeSocketIO } from './socket.js';
import fastifyMultipart from 'fastify-multipart';
import fastifyStatic from '@fastify/static';
import path from 'path';
import mqtt from 'mqtt';

const hostMyIp = config.hostMyIp;
const fastify = Fastify({
  logger: true,
});


const brokerUrl = 'mqtt://192.168.43.114';
const port = 1883;
const topic = 'esp32/#';

const client = mqtt.connect(brokerUrl, {
  port,
  username: '',
  password: '',
});

client.on('connect', () => {
  client.subscribe([topic], function (err) {
    console.log(`connected to ${brokerUrl} on port ${port}`)
    if (err) {
      console.log(topic, err)
    }
  })
});

client.on('message', (topic, message) => {
  const msg = message.toString()
  console.log(msg)
});

client.on('error', (error) => {
  console.error('Erreur de connexion MQTT :', error);
});

fastify.register(fastifyPostgres, {
  connectionString: 'postgres://user:password@127.0.0.1:5432/VROUM',
});

fastify.register(fastifyMultipart, {
  attachFieldsToBody: true,
});

fastify.register(fastifyStatic, { root: path.join(process.cwd(), 'uploads'),   prefix: '/uploads/', });

fastify.register(playerRoute);
fastify.register(raceRoute);
fastify.register(statsRoute);

const serverIo = http.createServer(fastify.server);
initializeSocketIO(serverIo);

try {
  await fastify.listen({ port: 4499, host: hostMyIp });
  await serverIo.listen(4500, hostMyIp, () => {
    console.log('Socket.IO server is running on port 4500');
  });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
