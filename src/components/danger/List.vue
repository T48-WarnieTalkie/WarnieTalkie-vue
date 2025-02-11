<script setup>
import ListItem from './ListItem.vue';

const props = defineProps({
  dangers: Object,
  buttons: Object
})

</script>

<template>
  <div id="dangerList">
    <ListItem v-for="(danger, i) in dangers" :danger="danger" :index="i" :buttons="buttons"/>
  </div>
  
</template>

<style scoped>
  #dangerList {
    max-width: 1000px;
  }
</style>