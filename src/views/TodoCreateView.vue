<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { createTodo } from '@/services/todo.service.js';
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

let router = useRouter();

let form = reactive({
  title: null,
  description: null,
})

const rules = {
  title: { required },
  description: { required }
}

const v$ = useVuelidate(rules, form)

async function handleCreateTodo() {
  const isValid = await v$.value.$validate()

  if(!isValid) {
    return
  }

  try {
    const { data } = await createTodo({
      title: form.title,
      description: form.description,
    })
  
    alert(data.message);
  
    router.push({
      name: 'home'
    })
  } catch (error) {
    alert(error.response.data.message)
  }
}

</script>

<template>
  <div class="flex justify-center">
    <div class="card w-96 bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">Todo</h2>
        <div>
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">Judul</span>
            </label>
            <input type="text" v-model="form.title" placeholder="Judul" data-test="input-title" class="input input-bordered w-full max-w-xs" />
            <div class="text-sm text-error" v-for="error of v$.title.$errors" :key="error.$uid">
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </div>
        </div>

        <div>
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">Deskripsi</span>
            </label>
            <input type="text" v-model="form.description" placeholder="description" data-test="input-description" class="input input-bordered w-full max-w-xs" />
            <div class="text-sm text-error" v-for="error of v$.description.$errors" :key="error.$uid">
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </div>
        </div>

        <div class="card-actions justify-end">
          <RouterLink to="/" class="btn">Batal</RouterLink>
          <button class="btn btn-primary" data-test="btn-create" @click="handleCreateTodo()">Tambahkan</button>
        </div>
      </div>
    </div>
  </div>
</template>
