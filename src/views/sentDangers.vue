<script setup>
import Sent from '@/components/danger/Sent.vue';
import HeaderBar from '@/components/HeaderBar.vue';

</script>

<template>
  <HeaderBar header="Le mie segnalazioni" subheader="Visualizza le segnalazioni di pericolo che hai inviato"/>
    <Suspense>
      <Sent/>

      <template #fallback>
      </template>
    </Suspense>
</template>