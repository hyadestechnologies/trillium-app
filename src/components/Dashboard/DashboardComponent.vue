<script setup lang="ts"></script>
<template>
    <div class="container h-100 flex flex-row gap-10 items-center justify-center">
        <div class="posts w-2/3 h-100">
            <router-view />
        </div>
        <div class="dashboard-functions w-1/3 h-100">this container contains dashboard controls</div>
    </div>
</template>