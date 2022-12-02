<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <header class="mb-5">
    <div class="navbar bg-primary">
      <a class="btn btn-ghost normal-case text-xl">Todo Application</a>
    </div>
  </header>
  <main class="container mx-auto pb-10">
    <RouterView />
  </main>
</template>