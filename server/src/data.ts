import * as Y from 'yjs';

type Task = {
  id: number;
  title: string;
  description: string;
  dueDate: Number;
  isDraft?: boolean;
};

export function getInitialDocumentState() {
  const yDoc = new Y.Doc();
  const tasks = yDoc.getMap('tasks');

  tasks.set('todo', new Y.Array<Task>());
  tasks.set('inprogress', new Y.Array<Task>());
  tasks.set('done', new Y.Array<Task>());

  let counter = 1;

  const todo = tasks.get('todo') as Y.Array<Task>;
  todo.push([
    {
      id: ++counter,
      title: 'todo something #1',
      description: 'todo something #1 description',
      dueDate: new Date().getTime(),
    },
    {
      id: ++counter,
      title: 'todo something #2',
      description: 'todo something #2 description',
      dueDate: new Date(2024, 1, 1).getTime(),
    },
    {
      id: ++counter,
      title: 'todo something #3',
      description: 'todo something #3 description',
      dueDate: new Date().getTime(),
    },
  ]);

  const inprogress = tasks.get('inprogress') as Y.Array<Task>;
  inprogress.push([
    {
      id: ++counter,
      title: 'inprogress something #1',
      description: 'inprogress something #1 description',
      dueDate: new Date().getTime(),
    },
    {
      id: ++counter,
      title: 'inprogress something #2',
      description: 'inprogress something #2 description',
      dueDate: new Date(2024, 1, 3).getTime(),
    },
    {
      id: ++counter,
      title: 'inprogress something #3',
      description: 'inprogress something #3 description',
      dueDate: new Date().getTime(),
    },
  ]);

  const done = tasks.get('done') as Y.Array<Task>;
  done.push([
    {
      id: ++counter,
      title: 'done something #1!!!',
      description: 'done something #1 description',
      dueDate: new Date().getTime(),
    },
    {
      id: ++counter,
      title: 'done something #2',
      description: 'done something #2 description',
      dueDate: new Date().getTime(),
    },
    {
      id: ++counter,
      title: 'done something #3',
      description: 'done something #3 description',
      dueDate: new Date(2024, 1, 1).getTime(),
    },
  ]);

  return Buffer.from(Y.encodeStateAsUpdate(yDoc));
}

export type User = {
  id: number;
  name: string;
  email: string;
};

export const users = [
  { id: 1, name: 'John Doe', email: 'John@example.com' },
  { id: 2, name: 'Jane Doe', email: 'Jane@example.com' },
];
