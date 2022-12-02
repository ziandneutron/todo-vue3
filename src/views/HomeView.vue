<script setup>
import TodoCard from '@/components/TodoCard.vue';

const todoList = [
  {
    title: 'todo 1',
    description: 'description todo 1'
  },
  {
    title: 'todo 2',
    description: 'description todo 2'
  },
  {
    title: 'todo 3',
    description: 'description todo 3'
  },
  {
    title: 'todo D',
    description: 'description todo 3'
  }
];

</script>

<template>
  <div class="grid grid-cols-4 gap-10">
    <TodoCard :title="item.title" :description="item.description" v-for="(item) in todoList" :key="item" />
  </div>
</template>
