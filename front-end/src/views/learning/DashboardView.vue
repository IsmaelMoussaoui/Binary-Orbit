<template>
    <div>
        <h1>Dashboard page</h1>
        <p>Connected with {{ userStore.user?.username }}</p>
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from '../../store/UserStore';

const userStore = useUserStore();
</script>

<style scoped></style>
