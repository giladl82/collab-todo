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
  console.log('todo', sharedStore.tasks.todo);
  sharedStore.tasks.todo?.find(task => {
    console.log('task--->', task)
    return task.id === id});
  for (const status in sharedStore.tasks) {
    const task = sharedStore.tasks[status as Status]?.find(task => {
      console.log('here', task, task.id, id);
    });

    if (task) return task;
  }

  return null;
};
