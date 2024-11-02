<script setup lang="ts">
import TasksList from '@/components/TasksList.vue';
import { useRouter } from 'vue-router';
import { initYjsConnection, sharedStore } from '@/stores/collaboration';
import { useAuthenticationStore } from '@/stores/authentication';

const authenticationStore = useAuthenticationStore();
const router = useRouter();

const user = await authenticationStore.getAuthenticatedUserAsync();
if (user?.id) {
  initYjsConnection(user?.id.toString());
}

const handleCreateTask = () => {
  const task = {
    id: new Date().getTime(),
    title: '',
    description: '',
    dueDate: new Date().getTime(),
    isDraft: true,
  };

  sharedStore.tasks.todo!.push({ ...task });

  router.push({ name: 'modal', query: { id: task.id } });
};
</script>

<template>
  <div>
    <div class="flex gap-6 px-6">
      <div
        class="w-1/3 min-h-[calc(100dvh-6rem)] flex flex-col gap-3 bg-stone-200 p-3"
      >
        <h2 class="text-xl font-semibold font-mono">Todo</h2>
        <TasksList
          :status="'todo'"
          class="min-h-[calc(100%-6rem)]"
        />
        <button
          @click="handleCreateTask"
          class="text-center border border-gray-500 cursor-pointer hover:bg-slate-50 rounded-md p-2"
        >
          + Add new task
        </button>
      </div>
      <div
        class="w-1/3 min-h-[calc(100dvh-6rem)] flex flex-col gap-3 bg-slate-200 p-3"
      >
        <h2 class="text-xl font-semibold font-mono">In Progress</h2>
        <TasksList :status="'inprogress'" />
      </div>
      <div
        class="w-1/3 min-h-[calc(100dvh-6rem)] flex flex-col gap-3 bg-lime-200 p-3"
      >
        <h2 class="text-xl font-semibold font-mono">Done</h2>
        <TasksList :status="'done'" />
      </div>
    </div>
    <Suspense>
      <RouterView v-if="$route.meta.showModal" />
    </Suspense>
  </div>
</template>
