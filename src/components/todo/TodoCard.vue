<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  todo: {
    type: Object,
    default: () => {
      return {
        id: null,
        title: null,
        description: null
      }
    }
  }
})
</script>

<template>
  <div class="card w-96 bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title">{{ props.todo.title }}</h2>
      <p>{{ props.todo.description }}</p>
      <div class="card-actions justify-end">
        <slot :todo="todo"></slot>
      </div>
    </div>
  </div>
</template>