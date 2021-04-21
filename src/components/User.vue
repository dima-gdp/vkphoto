<template>
  <div class="owner">
    <div class="owner__ava">
      <img
        :src="photo"
        :alt="name"
      />
    </div>
    <span class="owner__name" :class="colorClass">{{
        name
      }}</span>
  </div>
</template>

<script>
export default {
  props: ['photo', 'name', 'colorClass', 'colorClass']
}
</script>

