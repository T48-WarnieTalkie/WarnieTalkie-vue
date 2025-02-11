<script setup>
import { timeDistance, categoryToString } from '@/utility/utils';
import DangerStatus from './StatusString.vue';
  const props = defineProps({
    danger: Object,
    index: Number,
    buttons: Object
  })
  let user
  await fetch(import.meta.env.VITE_API_ENDPOINT + '/users/' + props.danger.userID, {
    method: 'GET'
  }).then((resp) => resp.json())
  .then((data) => {
    user = data
  })
</script>

<template>
  <div :class="'d-flex border-secondary-subtle border p-3 ' + ((index%2) ? '' : 'bg-body-secondary')">
    <div>
      <RouterLink :to="'/danger/' + danger._id">
        <h4> {{ categoryToString(danger.category) }}</h4>
      </RouterLink>
      <span>inviata {{timeDistance(danger.sendTimestamp)}} fa da </span>
      <span class="underlined">{{ user.name }} {{ user.surname }}</span>
      <br>
      <DangerStatus :danger="danger"/>
    </div>
    <div class="ms-auto">
      <component :is="buttons" v-bind="{danger: danger}"></component>
    </div>
  </div>
</template>