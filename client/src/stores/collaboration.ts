import * as Vue from 'vue';

import { HocuspocusProvider } from '@hocuspocus/provider';
import { syncedStore, getYjsDoc } from '@syncedstore/core';
import type { Task } from '@/types/task';
import { enableVueBindings } from '@syncedstore/core';
import type { Status } from '@/types/task';

enableVueBindings(Vue);

let wasInitialized = false;

type Tasks = {
  todo: Task[];
  inprogress: Task[];
  done: Task[];
};

export const sharedStore = syncedStore({ tasks: {} as Tasks });

export const initYjsConnection = (documentName?: string) => {
  if (wasInitialized) return;
  wasInitialized = true;

  if (!documentName) {
    throw new Error('Document name is required');
  }

  new HocuspocusProvider({
    url: 'ws://127.0.0.1:1234/collaboration',
    name: documentName,
    document: getYjsDoc(sharedStore),
    token: 'token',
  });
};

export const getTaskById = (id: number) => {
  for (const status in sharedStore.tasks) {
    const task = sharedStore.tasks[status as Status]?.find(task => {
      return task.id === id;
    });

    if (task) return task;
  }

  return null;
};

export const removeSharedTask = (id: number, status: Status = 'todo') => {
  const index =
    sharedStore.tasks[status as Status]?.findIndex(task => task.id === id) ??
    -1;

  if (index > -1) {
    sharedStore.tasks[status as Status]?.splice(index, 1);
  }
};
