<script setup>
import { timeDistance } from '@/utility/utils';

const props = defineProps({
  danger: Object
})
</script>

<template>
  <span>stato: </span>
  <span v-if="danger.status === 'waiting-approval'" class="text-info">in attesa di approvazione</span>
  <span v-else-if="danger.status === 'approved'" class="text-success">approvata</span>
  <span v-else-if="danger.status === 'rejected'" class="text-danger">rifiutata</span>
  <span v-else-if="danger.status === 'expired'" class="text-muted">scaduta</span>

  <span v-if="danger.status === 'approved'"> (scade fra {{ timeDistance(danger.expiration) }})</span>
</template>