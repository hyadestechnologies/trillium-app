<script setup lang="ts"></script>

<template>
  <div class="profile-picture w-1/2 md:w-full h-full md:h-[30%]">
    <svg class="w-full h-full">
      <g class="w-full h-full">
        <circle cx="50%" cy="50%" r="35%" fill="white" />
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="100%" fill="black">
          Profile picture
        </text>
      </g>
    </svg>
  </div>

  <div class="w-full h-full p-5">
    <ul>
      <li><RouterLink to="/profile/posts">Posts</RouterLink></li>
      <li><RouterLink to="/profile/friends">Friends</RouterLink></li>
      <li><RouterLink to="/profile/followed">Followed</RouterLink></li>
    </ul>
  </div>
</template>
