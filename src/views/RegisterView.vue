<script setup>
import axios from 'axios';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

let router = useRouter();

let form = reactive({
  name: null,
  email: null,
  password: null,
})

let umur = ref(10)

async function register() {
  const res = await axios.post('http://localhost:3000/user/register', {
    name: form.name,
    email: form.email,
    password: form.password,
    "age": 20
  })

  alert('register berhasil');

  router.push({
    name: 'home'
  })
  console.log('res', res);
}

</script>

<template>
  <div class="flex justify-center">
    <div class="card w-96 bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">Register</h2>
        <div>
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">Name</span>
            </label>
            <input type="text" v-model="form.name" placeholder="Name" class="input input-bordered w-full max-w-xs" />
          </div>
        </div>

        <div>
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input type="email" v-model="form.email" placeholder="Email" class="input input-bordered w-full max-w-xs" />
          </div>
        </div>

        <div>
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input type="password" v-model="form.password" placeholder="Password" class="input input-bordered w-full max-w-xs" />
          </div>
        </div>

        <div>
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">Umur</span>
            </label>
            <input type="text" v-model="umur" placeholder="Umur" class="input input-bordered w-full max-w-xs" />
          </div>
        </div>

        <div class="card-actions justify-end">
          <button class="btn btn-primary" @click="register()">Register</button>
        </div>
      </div>
    </div>
  </div>
</template>
