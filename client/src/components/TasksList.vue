<script setup lang="ts">
import Draggable from 'vuedraggable';
import TaskCard from '@/components/TaskCard.vue';
import { sharedStore } from '@/stores/collaboration';
import type { Status } from '@/types/task';

const { status } = defineProps<{ status: Status }>();

</script>
<template>
  <Draggable
    id="todo"
    v-model="sharedStore.tasks[status]"
    group="tasks"
    item-key="id"
    class="min-h-[calc(100%-3rem)]"
    delay="100"
    animation="300"
  >
    <template #item="{ element: task }">
      <TaskCard
        :task="task.value"
        :status="status"
        v-if="!task.isDraft"
      />
    </template>
  </Draggable>
</template>
