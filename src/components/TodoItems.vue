<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  }
})

</script>
<template>
  <div>Items:</div>
  <div>
    <div class="badge" v-for="item in props.items" :key="item">{{ item }}</div>
  </div>
</template>
