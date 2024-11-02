<script setup lang="ts">
import type { Status, Task } from '@/types/task';
import { RouterLink } from 'vue-router';
const { task, status } = defineProps<{ task: Task; status: Status }>();
const today = new Date(new Date().toLocaleDateString());
</script>

<template>
  <RouterLink
    v-if="task"
    :to="{ name: 'modal', query: { id: task.id } }"
    :class="{
      'block bg-white p-3 mb-3 border rounded-md shadow-sm hover:shadow-md': true,
      'border-red-400 border-2':
        status !== 'done' &&
        task.dueDate &&
        new Date(task.dueDate).getTime() < today.getTime(),
    }"
  >
    <div class="font-semibold">
      {{ task.title }}
    </div>
    <p class="text-sm">
      {{ task.description ?? 'description' }}
    </p>
    <p class="text-xs">
      {{
        new Date(task.dueDate).toLocaleDateString('en-GB') ??
        new Date().toDateString()
      }}
    </p>
  </RouterLink>
</template>
