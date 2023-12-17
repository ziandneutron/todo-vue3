<script setup>
import TodoCard from '@/components/todo/TodoCard.vue';
import { ref, onMounted } from 'vue';
import { getTodoList, deleteTodo } from '@/services/todo.service.js';

const todoList = ref([]);
const page = ref(1);

onMounted(async () => {
  getTodo()
})

async function getTodo () {
  const { data } = await getTodoList(page.value)
  todoList.value = data.docs;
}

async function handleDelete ({ id }) {
  if (!confirm('Apakah anda yakin ingin menghapus todo ini ?')) {
    return
  }
  
  try {
    await deleteTodo(id)
    await getTodo()
  } catch (error) {
    alert(error.response.data.message)
  }
}
</script>

<template>
  <div class="flex justify-center items-center">
    <div>
      <RouterLink :to="`/todo/create`" class="btn btn-primary">Tambah</RouterLink>
      <TodoCard v-for="(item, index) in todoList" :key="index" :todo="item" data-test="todo-card" class="mb-2">
        <template v-slot="{ todo }">
          <RouterLink :to="`/todo/${todo.id}/update`" class="btn btn-primary">Edit</RouterLink>
          <button @click="handleDelete(todo)" :data-test="`btn-delete-todo-${index}`" class="btn btn-error">Hapus</button>
        </template>
      </TodoCard>
    </div>
  </div>
</template>
