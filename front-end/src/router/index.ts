import { createRouter, createWebHistory } from 'vue-router';
import { useRouteStore } from '../store/RouteStore';
import { useUserStore } from '../store/UserStore';

const Home = () => import('../views/HomeView.vue');
const Login = () => import('../views/auth/LoginView.vue');
const Register = () => import('../views/auth/RegisterView.vue');
const Dashboard = () => import('../views/learning/DashboardView.vue');
const Admin = () => import('../views/admin/AdminView.vue');
const NotFound = () => import('../views/error/NotFound.vue');

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'Home', component: Home, meta: { requiresNotAuth: true } },

        // Auth views
        { path: '/auth/login', name: 'Login', component: Login, meta: { requiresNotAuth: true } },
        { path: '/auth/register', name: 'Register', component: Register, meta: { requiresNotAuth: true } },

        // Learning views
        { path: '/learning/dashboard', name: 'Dashboard', component: Dashboard, meta: { requiresAuth: true } },

        // Admin views
        { path: '/admin', name: 'admin', component: Admin, meta: { requiresAuth: true } },

        { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
    ],
});

router.beforeEach(async (to, _from, next) => {
    const userStore = useUserStore();
    const routeStore = useRouteStore();

    if (to.matched.some((record) => record.meta.requiresAuth)) {
        // Checks if the route requires authentication
        if (!userStore.isLoggedIn) {
            routeStore.setRedirectUrl(to.fullPath);
            next({ name: 'Login' });
        } else {
            next();
        }
    } else if (to.matched.some((record) => record.meta.requiresNotAuth)) {
        // Checks if the route requires not being authenticated
        if (userStore.isLoggedIn) {
            next({ name: 'Dashboard' });
        } else {
            next();
        }
    } else {
        next();
    }
});
