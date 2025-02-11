<script setup>
import HeaderBar from '@/components/HeaderBar.vue';
import UserInfoForm from '@/components/UserInfoForm.vue';

</script>

<template>
  <HeaderBar header="Area riservata" subheader="Modifica le tue informazioni personali"/>
  <Suspense>
    <UserInfoForm/>
    <template #fallback>

    </template>
  </Suspense>
</template>
