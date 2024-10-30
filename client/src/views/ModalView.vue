<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed } from 'vue';
import { updateSharedTask, useTasks } from '@/composables/useTasks';
import { useRouter } from 'vue-router';
import type { Task } from '@/types/task';
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';

const { tasks } = await useTasks();
const task = ref<Task | null>(null);
const originalTask = ref<Task | null>(null);
const modalElement = ref<HTMLElement | null>(null);

const router = useRouter();
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
  const target = event.target as HTMLInputElement;
  task.value!.dueDate = new Date(target.value);
  updateSharedTask(task.value as Task);
};

const handleCancel = () => {
  task.value = originalTask.value;
  updateSharedTask(task.value as Task);
  router.replace({ name: 'home' });
};

const handleSave = () => {
  if(!task.value) return;

  task.value.isDraft = false;
  updateSharedTask(task.value as Task);
  router.push({ name: 'home' });
};

onMounted(() => {
  const flatArr = Array.from(Object.values(tasks)).flatMap(arr => arr);
  task.value = flatArr.find(
    task => task.id === Number(router.currentRoute.value.query.id),
  ) as Task;

  if (!task.value) {
    router.replace({ name: 'home' });
  }

  originalTask.value = { ...task.value };
  console.log(task.value.isDraft);
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
            @input="updateSharedTask(task)"
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
            @input="updateSharedTask(task)"
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
            :value="formattedDate"
            placeholder="Due Date"
            class="w-full border border-gray-500 rounded-md p-1"
            @input="handleDueDateChange"
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
