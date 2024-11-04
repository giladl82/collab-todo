<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import {} from '@/stores/collaboration';
import { useRouter } from 'vue-router';
import type { Task } from '@/types/task';
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';
import { getTaskById, removeSharedTask } from '@/stores/collaboration';

const router = useRouter();
const sharedTask = getTaskById(Number(router.currentRoute.value.query.id));
const task = ref<Task | null>(sharedTask);
const originalTask = ref<Task | null>(task.value ? { ...task.value } : null);
const modalElement = ref<HTMLElement>();

const { activate, deactivate } = useFocusTrap(modalElement, {
  immediate: true,
});

const formattedDate = computed(() => {
  if (task.value?.dueDate) {
    const date = new Date(task.value.dueDate);
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
  } else {
    return new Date().toDateString();
  }
});

const handleDueDateChange = (event: Event) => {
  if (!sharedTask || !task.value) return;

  const target = event.target as HTMLInputElement;
  task.value.dueDate = new Date(target.value).getTime();
  sharedTask.dueDate = task.value!.dueDate;
};

const handleCancel = () => {
  if (!task.value || !originalTask.value || !sharedTask) return;

  task.value = originalTask.value;
  sharedTask.description = originalTask.value.description;
  sharedTask.id = originalTask.value.id;
  sharedTask.dueDate = originalTask.value.dueDate;
  sharedTask.isDraft = originalTask.value.isDraft;
  sharedTask.title = originalTask.value.title;

  if(sharedTask.isDraft) {
    removeSharedTask(sharedTask.id);
  }

  router.replace({ name: 'home' });
};

const handleSave = () => {
  if (!sharedTask) return;

  sharedTask.isDraft = false;

  router.push({ name: 'home' });
};

onMounted(() => {
  activate();
});

onUnmounted(() => {
  deactivate();
});
</script>

<template>
  <div
    ref="modalElement"
    @keydown.esc="handleCancel"
    @click.self="handleCancel"
    class="fixed inset-0 flex items-center justify-center w-full h-full bg-gray-300 bg-opacity-50"
  >
    <div class="bg-white w-full max-w-md p-5 border rounded-md shadow-md">
      <h2 class="text-xl font-semibold mb-3">
        {{ task?.isDraft ? 'Update Task' : 'Add Task' }}
      </h2>
      <form
        v-if="task"
        class="flex flex-col gap-3 mb-3"
      >
        <div class="flex flex-col gap-1">
          <label
            class=""
            for="title"
            >Title</label
          >
          <input
            id="title"
            type="text"
            v-model="task.title"
            placeholder="Title"
            class="w-full border border-gray-500 rounded-md p-1"
          />
        </div>
        <div class="flex flex-col gap-1">
          <label
            class=""
            for="description"
            >Description</label
          >
          <textarea
            id="description"
            v-model="task.description"
            placeholder="Description"
            class="w-full border border-gray-500 rounded-md p-1"
          ></textarea>
        </div>
        <div class="flex flex-col gap-1">
          <label
            class=""
            for="dueDate"
            >Due Date</label
          >
          <input
            type="date"
            id="dueDate"
            placeholder="Due Date"
            class="w-full border border-gray-500 rounded-md p-1"
            :value="formattedDate"
            @change="handleDueDateChange"
          />
        </div>
      </form>
      <div class="flex justify-end gap-3">
        <button
          class="text-gray-500 text-sm relative top-[1px]"
          @click="handleCancel"
        >
          Cancel
        </button>
        <button
          class="text-blue-500 font-semibold"
          @click="handleSave"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>
