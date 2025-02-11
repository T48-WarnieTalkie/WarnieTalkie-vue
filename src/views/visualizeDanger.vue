<script setup>
import Visualizer from '@/components/danger/Visualizer.vue';
import HeaderBar from '@/components/HeaderBar.vue';
import { useRoute } from 'vue-router';

</script>

<template>
  <HeaderBar header="Segnalazione di pericolo"/>
  <Suspense>
    <Visualizer :dangerId="useRoute().params.dangerId"/>
    
    <template #fallback>
    </template>
  </Suspense>
  
</template>