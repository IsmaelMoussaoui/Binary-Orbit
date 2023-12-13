<template>
    <div>
        <h1>Register page</h1>
        <form @submit.prevent="register">
            <label for="username">Nom d'utilisateur:</label>
            <input type="text" id="username" v-model="username" />

            <label for="email">Addresse mail:</label>
            <input type="text" id="email" v-model="email" />

            <label for="password">Mot de passe:</label>
            <input type="password" id="password" v-model="password" />

            <label for="confirmPassword">Confimer mot de passe:</label>
            <input type="password" id="confirmPassword" v-model="confirmPassword" />

            <button type="submit" :disabled="isSubmitting">S'inscrire</button>
        </form>

        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../../store/UserStore';

const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const errorMessage = ref('');
const isSubmitting = ref(false);

const userStore = useUserStore();
const router = useRouter();

const register = () => {
    if (isSubmitting.value) {
        return;
    }

    if (password.value !== confirmPassword.value) {
        errorMessage.value = 'Les mots de passes ne sont pas les même';
        return;
    }

    isSubmitting.value = true;
    errorMessage.value = '';

    userStore
        .register(username.value, email.value, password.value)
        .then(() => {
            console.log('Inscription réussie');
            router.push('/learning/dashboard');
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
