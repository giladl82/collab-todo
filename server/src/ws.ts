import { Database } from '@hocuspocus/extension-database';
import { Server } from '@hocuspocus/server';
import { PORT } from './consts';
import { getInitialDocumentState } from './data';
import * as Y from 'yjs';

const localData: Record<string, Buffer> = {};

// Use this to convert a yjs buffer readable json
// function bufferToYDoc(buffer: Buffer) {
//   const yDoc = new Y.Doc();
//   const uint8Array = new Uint8Array(buffer);
//   Y.applyUpdate(yDoc, uint8Array);
//   return yDoc;
// }

// Initialize Hocuspocus server for collaborative editing
export const server = Server.configure({
  name: 'server',
  port: PORT,
  async onAuthenticate({ token }) {
    return;
  },
  extensions: [
    new Database({
      fetch: async ({ documentName }) => {
        if (localData[documentName]) {
          return localData[documentName];
        } else {
          // const user = getUser(token);
          const initialState = getInitialDocumentState();
          localData[documentName] = initialState;

          return initialState;
        }
      },
      store: async ({ documentName, state }) => {
        localData[documentName] = state;
      },
    }),
  ],
  async onConnect({ documentName }) {
    console.log(`Client connected to document: ${documentName}`);
  },
  async onDisconnect({ documentName }) {
    console.log(`Client disconnected from document: ${documentName}`);
  },
});
