// import { reactive, ref, onMounted } from 'vue';
// import { useAuthenticationStore } from '@/stores/authentication';
// import { getYjsConnection } from '@/services/yjs';
// import * as Y from 'yjs';
// import type { Task } from '@/types/task';

// export type Status = 'todo' | 'inprogress' | 'done';
// const statuses = ['todo', 'inprogress', 'done'] as const;

// const localTasks = reactive({
//   todo: [] as Task[],
//   inprogress: [] as Task[],
//   done: [] as Task[],
// });

// const syncWithSharedTasks = (sharedTasks: Y.Map<unknown>) => {
//   for (const status of statuses) {
//     if (sharedTasks.get(status) as Y.Array<Task>) {
//       localTasks[status] = (sharedTasks.get(status) as Y.Array<Task>).toArray();
//     }
//   }
// };

// const authenticationStore = useAuthenticationStore();

// await authenticationStore.getAuthenticatedUserAsync();

// const { yDoc } = await getYjsConnection(
//   authenticationStore.user?.id?.toString() ?? '',
//   (yDoc: Y.Doc | null) => {
//     if (yDoc) {
//       const sharedTasks = yDoc?.getMap() as Y.Map<unknown>;
//       if (sharedTasks) {
//         syncWithSharedTasks(sharedTasks);
//       }
//     }
//   },
// );

// const sharedTasks = yDoc ? (yDoc.getMap('tasks') as Y.Map<unknown>) : null;

// export const createNewSharedTask = () => {
//   if (!yDoc || !sharedTasks) return;

//   const sharedTasksArray = sharedTasks.get('todo') as Y.Array<Task>;
//   const task = {
//     id: Date.now(),
//     title: '',
//     description: '',
//     dueDate: new Date(),
//     isDraft: true,
//   };

//   yDoc.transact(() => {
//     sharedTasksArray.insert(sharedTasksArray.length, [task]);
//   });

//   return task;
// };

// export const deleteSharedTask = (id: number) => {
//   if (!yDoc || !sharedTasks) return;

//   const sharedTasksArray = sharedTasks.get('todo') as Y.Array<Task>;
//   const index = sharedTasksArray.toArray().findIndex(task => task.id === id);
//   if (index > -1) {
//     yDoc.transact(() => {
//       sharedTasksArray.delete(index);
//     });
//   }
// };

// export const updateSharedTask = (task: Task) => {
//   if (!yDoc || !sharedTasks) return;

//   const sharedTasksArray = sharedTasks.get('todo') as Y.Array<Task>;
//   const index = sharedTasksArray.toArray().findIndex(t => t.id === task.id);
//   if (index > -1) {
//     yDoc.transact(() => {
//       sharedTasksArray.delete(index);
//       sharedTasksArray.insert(index, [task]);
//     });
//   }
// };

// export const useTasks = async (status?: Status) => {
//   const isUpdatingLocalTasks = ref(false);

//   const updateLocalTasks = (status: Status) => {
//     console.log('updateLocalTasks', status);

//     if (!yDoc) return;

//     isUpdatingLocalTasks.value = true;

//     const sharedTasks = yDoc.getMap('tasks') as Y.Map<unknown>;
//     const sharedTasksArray = sharedTasks.get(status) as Y.Array<Task>;
//     yDoc.transact(() => {
//       // Clear yArray and re-insert items in the new order
//       sharedTasksArray.delete(0, sharedTasksArray.length);
//       sharedTasksArray.push([...localTasks[status]]);
//     });

//     isUpdatingLocalTasks.value = false;
//   };

//   onMounted(async () => {
//     if (!status) return;

//     if (sharedTasks) {
//       const yArray = sharedTasks.get(status) as Y.Array<Task>;

//       yArray.observeDeep(() => {
//         if (isUpdatingLocalTasks.value) return;

//         console.log('Shared tasks updated');

//         syncWithSharedTasks(sharedTasks);
//       });

//       syncWithSharedTasks(sharedTasks);
//     }
//   });

//   return { tasks: localTasks, updateLocalTasks };
// };
