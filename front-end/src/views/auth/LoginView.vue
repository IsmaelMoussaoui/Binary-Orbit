<template>
    <div>
        <h1>Login page</h1>
        <form @submit.prevent="login">
            <label for="email">Addresse mail:</label>
            <input type="text" id="email" v-model="email" />

            <label for="password">Mot de passe:</label>
            <input type="password" id="password" v-model="password" />

            <button type="submit" :disabled="isSubmitting">Se connecter</button>
        </form>

        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useRouteStore } from '../../store/RouteStore';
import { useUserStore } from '../../store/UserStore';

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const isSubmitting = ref(false);

const userStore = useUserStore();
const routeStore = useRouteStore();
const router = useRouter();

const login = () => {
    if (isSubmitting.value) {
        return;
    }

    isSubmitting.value = true;
    errorMessage.value = '';

    userStore
        .login(email.value, password.value)
        .then(() => {
            console.log('Connexion réussie');
            const redirectUrl = routeStore.redirectUrl;
            if (redirectUrl) {
                routeStore.deleteRedirectUrl();
                router.push(redirectUrl);
            } else {
                router.push('/learning/dashboard');
            }
        })
        .catch(() => {
            errorMessage.value = "Nom d'utilisateur ou mot de passe incorrect";
        })
        .finally(() => {
            isSubmitting.value = false;
        });
};
</script>

<style scoped>
div {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
    text-align: center;
    color: #333;
}

form {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
}

label {
    margin-bottom: 5px;
    color: #555;
}

input {
    padding: 8px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

button {
    padding: 10px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #45a049;
}

.error-message {
    color: #d9534f;
    margin-top: 10px;
}

button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}
</style>
