<script setup lang="ts">
import { useTasks, type Status } from '@/composables/useTasks';
import Draggable from 'vuedraggable';
import TaskCard from '@/components/TaskCard.vue';

const { status } = defineProps<{ status: Status }>();

const { tasks, updateLocalTasks } = await useTasks(status);
</script>

<template>
  <Draggable
    id="todo"
    v-model="tasks[status]"
    group="tasks"
    item-key="id"
    @end="updateLocalTasks(status)"
    @add="updateLocalTasks(status)"
    class="min-h-[calc(100%-3rem)]"
    delay="100"
    animation="300"
  >
    <template #item="{ element: task }">
      <TaskCard
        :task="task"
        :status="status"
        v-if="!task.isDraft"
      />
    </template>
  </Draggable>
</template>
