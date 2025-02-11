<script setup>
const props = defineProps({
  subheader: String
})
</script>

<template>
  <div>
    <h3>Qui non c'è nulla</h3>
    <p> {{ subheader }} </p>
  </div>
</template>