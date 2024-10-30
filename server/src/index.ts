import express, { Response } from 'express';
import expressWebsocket from 'express-ws';
import cors from 'cors';

import { authRouter } from './auth';
import { server } from './ws';
import { PORT, JWT_SECRET } from './consts';

const { app } = expressWebsocket(express());
app.set('trust proxy', true);
app.use(express.json());

app.use(cors())

app.get('/', (_, response: Response) => {
  response.send('Hello World!');
});

app.use('/api', authRouter);

// Add a websocket route for Hocuspocus
app.ws('/collaboration', (websocket, request) => {
  console.log('WebSocket route /collaboration hit'); // Log for WebSocket connection attempt
  server.handleConnection(websocket, request);
});

// Start the server
app.listen(PORT, () => console.log(`Listening on http://127.0.0.1:${PORT}`));
