<script setup>
import { timeDistance } from '@/utility/utils';
const props = defineProps({
  danger: Object
})
</script>

<template>
  <span>scade fra: </span>
  <span> {{ timeDistance(danger.expiration) }}</span>
</template>