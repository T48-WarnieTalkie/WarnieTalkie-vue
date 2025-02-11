<script setup>
import HeaderBar from '@/components/HeaderBar.vue';
import Handle from '@/components/danger/Handle.vue';
import Tabs from '@/components/Tabs.vue';

const tabs = {tabs: [
  {id:"waitingApproval", name: "In attesa di approvazione", link:"ciao"},
  {id:"active", name: "Attive", link:"ciao"},
  {id: "rejectedExpired", name: "Rifiutate o scadute", link:"ciao"}
]}


</script>

<template>
  <HeaderBar header="Gestisci segnalazioni" subheader="Approva o rifiuta segnalazioni di pericolo" :component="Tabs" :componentProps="tabs"/>
  <Suspense>
    <Handle/>
    <template #fallback>
    </template>
  </Suspense>
</template>