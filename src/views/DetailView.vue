<script setup>
import axios from 'axios';
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router'
import TodoItems from '@/components/TodoItems.vue'

const route = useRoute()

const todoDetail = reactive({
  title: null,
  description: null,
  items: []
})

async function getDetailTodo(id) {
  const res = await axios.get(`http://localhost:3000/todo/${id}`);
  const data = res.data;
  todoDetail.title = data.title;
  todoDetail.description = data.description;
  todoDetail.items = data.items
}

onMounted(() => {
  console.log('route', route.params)
  getDetailTodo(route.params.id)
})

</script>
<template>
  <div>
    <h1>Detail Todo</h1>
    <div>Title: {{ todoDetail.title }}</div>
    <div>Description: {{ todoDetail.description }}</div>
    <TodoItems :items="todoDetail.items" ></TodoItems>
  </div>
</template>
