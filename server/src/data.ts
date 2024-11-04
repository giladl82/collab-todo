import * as Y from 'yjs';

export type Task = {
  id: number;
  title: string;
  description: string;
  dueDate: Number;
  isDraft?: boolean;
};

export const getInitialDocumentState = () => {
  const yDoc = new Y.Doc();
  const tasks = yDoc.getMap('tasks');

  let counter = 0;

  const todoArray = tasks.set(
    'todo',
    new Y.Array<unknown>()
  ) as Y.Array<unknown>;

  const day = 1000 * 60 * 60 * 24;
  const today = new Date(new Date().toDateString()).getTime();

  const todo1 = new Y.Map();
  todo1.set('id', ++counter);
  todo1.set('title', 'todo something #1');
  todo1.set('description', 'todo something #1 description');
  todo1.set('dueDate', today - day * 2);

  const todo2 = new Y.Map();
  todo2.set('id', ++counter);
  todo2.set('title', 'todo something #2');
  todo2.set('description', 'todo something #2 description');
  todo2.set('dueDate', today + day * 2);

  const todo3 = new Y.Map();
  todo3.set('id', ++counter);
  todo3.set('title', 'todo something #3');
  todo3.set('description', 'todo something #3 description');
  todo3.set('dueDate', today - day);

  todoArray.push([todo1, todo2, todo3]);

  const inprogressArray = tasks.set(
    'inprogress',
    new Y.Array<unknown>()
  ) as Y.Array<unknown>;

  const inprogress1 = new Y.Map();
  inprogress1.set('id', ++counter);
  inprogress1.set('title', 'inprogress something #1');
  inprogress1.set('description', 'inprogress something #1 description');
  inprogress1.set('dueDate', today);

  const inprogress2 = new Y.Map();
  inprogress2.set('id', ++counter);
  inprogress2.set('title', 'inprogress something #2');
  inprogress2.set('description', 'inprogress something #2 description');
  inprogress2.set('dueDate', today + day);

  const inprogress3 = new Y.Map();
  inprogress3.set('id', ++counter);
  inprogress3.set('title', 'inprogress something #3');
  inprogress3.set('description', 'inprogress something #3 description');
  inprogress3.set('dueDate', today);

  inprogressArray.push([inprogress1, inprogress2, inprogress3]);

  const doneArray = tasks.set(
    'done',
    new Y.Array<unknown>()
  ) as Y.Array<unknown>;

  const done1 = new Y.Map();
  done1.set('id', ++counter);
  done1.set('title', 'inprogress something #1');
  done1.set('description', 'done something #1 description');
  done1.set('dueDate', today);

  const done2 = new Y.Map();
  done2.set('id', ++counter);
  done2.set('title', 'done something #2');
  done2.set('description', 'done something #2 description');
  done2.set('dueDate', today);

  const done3 = new Y.Map();
  done3.set('id', ++counter);
  done3.set('title', 'done something #3');
  done3.set('description', 'done something #3 description');
  done3.set('dueDate', today);

  doneArray.push([done1, done2, done3]);

  return Buffer.from(Y.encodeStateAsUpdate(yDoc));
};

export type User = {
  id: number;
  name: string;
  email: string;
};

export const users = [
  { id: 1, name: 'John Doe', email: 'John@example.com' },
  { id: 2, name: 'Jane Doe', email: 'Jane@example.com' },
];
