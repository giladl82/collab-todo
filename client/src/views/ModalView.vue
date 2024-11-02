<script setup lang="ts">
//TODO: Create a function to find the task by id and get the task
//TODO: Bind the form to the task
//TODO: Set a cancel object

//Maybe what needs to do is to create another array of temporary tasks

import { onMounted, onUnmounted, ref } from 'vue';
import {} from '@/stores/collaboration';
import { useRouter } from 'vue-router';
import type { Task } from '@/types/task';
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';
import { getTaskById } from '@/stores/collaboration';

const router = useRouter();
const task = ref<Task | null>({
  ...(getTaskById(Number(router.currentRoute.value.query.id)) ?? ({} as Task)),
});

console.log(getTaskById(Number(router.currentRoute.value.query.id)));
console.log(task.value?.title);

const originalTask = ref<Task | null>(
  //  task.value?.value ? { ...task.value?.value } : null
  null
);
const modalElement = ref<HTMLElement>();
const { activate, deactivate } = useFocusTrap(modalElement, {
  immediate: true,
});

const handleCancel = () => {
  if (!task.value || !originalTask.value) return;

  // task.value.value = originalTask.value;

  router.replace({ name: 'home' });
};

const handleSave = () => {
  // if (!task.value?.value) return;
  // task.value.value.isDraft = false;
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

<!-- const { tasks } = await useTasks();
const task = ref<Task | null>(null);
const originalTask = ref<Task | null>(null);
const modalElement = ref<HTMLElement | null>(null);



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
  const target = event.target as HTMLInputElement;
  task.value!.dueDate = new Date(target.value);
  updateSharedTask(task.value as Task);
}; -->

<!--

if (!task.value) {
  router.replace({ name: 'home' });
}

originalTask.value = { ...task.value };
console.log(task.value.isDraft); -->
