<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: 'ini default'
  },
  index: {
    type: Number,
    default: 0
  }
})
</script>

<template>
  <div class="card w-96 bg-base-100 shadow-xl">
    <figure><img src="https://placeimg.com/400/225/arch" alt="Shoes" /></figure>
    <div class="card-body">
      <h2 class="card-title">{{ props.title }}</h2>
      <p>{{ props.description }}</p>
      <div class="card-actions justify-end">
        <RouterLink :to="`/detail/${props.index+1}`" class="btn btn-primary">Buy Now</RouterLink>
      </div>
    </div>
  </div>
</template>