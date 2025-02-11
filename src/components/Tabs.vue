<script setup>
import { RouterLink } from 'vue-router';
const props = defineProps({
  tabs: [Object]
})

</script>

<template>
  <ul class="nav nav-tabs" role="tablist">
    <li class="nav-item" role="presentation" v-for="(tab, i) in tabs">
      <button :id="tab.id" :class="'text-body nav-link ' + (i==0 ? 'active' : '')" :to="tab.link" data-bs-toggle="tab" :data-bs-target="'#' + tab.id + '-pane'" role="tab"> {{ tab.name }}</button>
    </li>
  </ul>
</template>