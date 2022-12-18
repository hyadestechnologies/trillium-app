<script setup lang="ts"></script>
<template>
    <div class="h-100 flex flex-col">
        <h1>Create new post</h1>
        <div class="form-container flex flex-col gap-1">
            <input type="text" placeholder="Title"> 
            <textarea name="description" id="descriptionTextArea" cols="30" rows="2" placeholder="Post description"></textarea>
            <h3 class="mt-5 font-bold">Upload a file or video you want to share</h3>
            <input type="file" >
            <button class="mt-10">Upload</button>
        </div>
    </div>
</template>