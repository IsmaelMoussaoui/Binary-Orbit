<template>
    <nav class="navbar">
        <div class="container">
            <a class="navbar-brand" href="/">Binary Orbit</a>

            <div class="navbar-buttons">
                <button v-if="!userStore.isLoggedIn" @click="login" class="navbar-button">Login</button>
                <button v-if="!userStore.isLoggedIn" @click="register" class="navbar-button">Register</button>
                <button v-if="userStore.isLoggedIn" @click="logout" class="navbar-button">Logout</button>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useUserStore } from '../store/UserStore';

const userStore = useUserStore();
const router = useRouter();

const login = () => {
    router.push({ name: 'Login' });
};

const register = () => {
    router.push({ name: 'Register' });
};

const logout = () => {
    userStore.logout();
    router.push({ name: 'Home' });
};
</script>

<style scoped>
.navbar {
    background-color: #2c3e50;
    color: #ecf0f1;
    padding: 10px 0;
}

.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.navbar-brand {
    color: #ecf0f1;
    text-decoration: none;
    font-size: 1.5rem;
}

.navbar-buttons {
    display: flex;
    gap: 10px;
}

.navbar-button {
    background-color: #3498db;
    color: #ecf0f1;
    border: none;
    padding: 10px 15px;
    cursor: pointer;
    border-radius: 5px;
    font-size: 1rem;
    transition: background-color 0.3s ease;
}

.navbar-button:hover {
    background-color: #2980b9;
}
</style>
