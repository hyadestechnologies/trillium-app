<script setup lang="ts"></script>
<template>
    <div class="h-full w-full flex flex-row gap-10 items-center justify-center bg-red-300">
        <div class="posts h-full w-full">
            <router-view />
        </div>
        <div class="dashboard-functions h-full w-full">this container contains dashboard controls</div>
    </div>
</template>