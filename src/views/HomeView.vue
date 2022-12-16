<script setup>
import TodoCard from '@/components/TodoCard.vue';
import axios from 'axios';
import { ref, onMounted } from 'vue';

const todoList = ref([]);
const page = ref(1);
const isDisabled = ref(false);

async function getTodoList() {
  const res = await axios.get('http://localhost:3000/todo', {
    params: {
      page: page.value
    }
  });
  console.log('res.data.docs', res.data)
  todoList.value = [...todoList.value, ...res.data.docs];
  if(res.data.nextPage) {
    isDisabled.value = false
  } else {
    isDisabled.value = true
  }
}

function nextPage() {
  page.value = page.value + 1
  getTodoList()
}

onMounted(async () => {
  await getTodoList()
})

</script>

<template>
  <div class="grid grid-cols-4 gap-10">
    <TodoCard v-for="(item, index) in todoList" :key="index" :index="index" :title="item.title" :description="item.description" />
  </div>
  <button class="btn btn-primary my-5" @click="nextPage()" :disabled="isDisabled" >Load more</button>
</template>
