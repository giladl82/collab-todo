<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthenticationStore } from '@/stores/authentication';

const authenticationStore = useAuthenticationStore();
const router = useRouter();

const handleLoginAs = async (email: string) => {
  const user = await authenticationStore.loginUser(email);
  if(user) {
    router.replace('/');
  }
};
</script>

<template>
  <div class="flex flex-col mt-[calc(50vh-4rem)] items-center gap-4 justify-center bg-opacity-50">
    <button
      @click="handleLoginAs('john@example.com')"
      class="border py-3 px-6 rounded-md shadow-sm cursor-pointer hover:bg-slate-300"
    >
      Login as John Due
    </button>
    <button
      @click="handleLoginAs('jane@example.com')"
      class="border py-3 px-6 rounded-md shadow-sm cursor-pointer hover:bg-slate-300"
    >
      Login as Jane Due
    </button>
  </div>
</template>
