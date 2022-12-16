<script setup>
import TodoCard from '@/components/TodoCard.vue';
import axios from 'axios';
import { ref, onMounted } from 'vue';

const todoList = ref([]);

async function getTodoList() {
  const res = await axios.get('http://localhost:3000/todo');

  todoList.value = res.data;
}

onMounted(async () => {
  await getTodoList()
})

</script>

<template>
  <div class="grid grid-cols-4 gap-10">
    <TodoCard v-for="(item, index) in todoList" :key="index" :index="index" :title="item.title" :description="item.description" />
  </div>
</template>
