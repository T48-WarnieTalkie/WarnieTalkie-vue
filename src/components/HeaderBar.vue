<script setup>

const props = defineProps({
  header: String,
  subheader: String,
  component: Object,
  componentProps: Object
})

</script>

<template>
  <div class="bg-body-secondary border-secondary-subtle border-bottom">
    <div class="mx-auto container-sm" style="max-width: 1000px">
      <div class="my-3">
        <h1>{{ header }}</h1>
        <p class="m-0">{{ subheader }}</p>
      </div>
      <component :is="component" v-bind="componentProps"></component>
    </div>
  </div>
</template>

<style scoped>
#brand {
  font-size: 22px
}

#logo {
  width: 30px;
}
</style>