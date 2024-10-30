import { ref } from 'vue';
import { defineStore } from 'pinia';
import Cookies from 'js-cookie';

interface User {
  id: number;
  name: string;
  email: string;
}


export const useAuthenticationStore = defineStore('authentication', () => {
  const user = ref<User | null>(null);
  const isAuthenticated = ref<boolean>(!!Cookies.get('jwt'));

  const setUser = (value: User | null) => {
    user.value = value;
    isAuthenticated.value = !!value;
  };

  const clearUser = () => {
    Cookies.remove('jwt');
    setUser(null);
  };

  const getAuthenticatedUserAsync = async () => {
    const response = await fetch('http://localhost:1234/api/auth', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('jwt')}`,
      },
    });

    if (response.ok) {
      setUser((await response.json()) as User);
      return user.value as User;
    } else {
      clearUser();

      return null;
    }
  };

  const loginUser = async (email: string) => {
    const response = await fetch('http://localhost:1234/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      const { token, user } = await response.json();

      Cookies.set('jwt', token);
      setUser(user);

      return user;
    }
  }

  return { user, isAuthenticated,
    setUser,
    clearUser,
    getAuthenticatedUserAsync,
    loginUser
   };
});

