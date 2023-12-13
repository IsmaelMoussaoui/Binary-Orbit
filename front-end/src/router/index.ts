import { createRouter, createWebHistory } from 'vue-router';

const Home = () => import('../views/HomeView.vue');
const Login = () => import('../views/auth/LoginView.vue');
const Register = () => import('../views/auth/RegisterView.vue');
const NotFound = () => import('../views/error/NotFound.vue');

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home },
        { path: '/auth/login', component: Login },
        { path: '/auth/register', component: Register },
        { path: '/:pathMatch(.*)*', component: NotFound },
    ],
});
