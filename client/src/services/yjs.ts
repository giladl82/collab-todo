import * as Y from 'yjs';
import { HocuspocusProvider } from '@hocuspocus/provider';

let yProvider: HocuspocusProvider | null;

const getYjsConnection = (documentName?: string,  onSync?: (yDoc: Y.Doc | null
) => void) => {
  return new Promise<{
    yProvider: HocuspocusProvider | null;
    yDoc: Y.Doc | null;
  }>(resolve => {
    if (!documentName) {
      throw new Error('Document name is required');
    }

    yProvider = new HocuspocusProvider({
      url: 'ws://127.0.0.1:1234/collaboration',
      name: documentName,
      document: new Y.Doc(),
      token: 'token',
    });

    yProvider.on('synced', () => {
      console.log('Document synced');

      if(typeof onSync === 'function') {
        onSync(yProvider?.document ?? null);
      }

      resolve({ yProvider, yDoc: yProvider?.document ?? null });
    });
  });
};

export { getYjsConnection };
