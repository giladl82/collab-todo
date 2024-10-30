<script setup lang="ts">
import { watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthenticationStore } from '@/stores/authentication';

const authenticationStore = useAuthenticationStore();
const router = useRouter();
watch(
  () => authenticationStore.isAuthenticated,
  () => {
    if (!authenticationStore.isAuthenticated) {
      router.replace('/login');
    } else {
      router.replace('/');
    }
  },
  { immediate: true },
);
</script>

<template>
  <header
    class="h-12 px-4 flex items-center justify-between mb-4 border-b shadow-md"
  >
    <h1 class="text-xl font-semibold font-mono">My Todo List</h1>
    <button
      v-if="authenticationStore.isAuthenticated"
      @click="authenticationStore.clearUser"
    >
      Logout
    </button>
  </header>
</template>

<style scoped></style>
