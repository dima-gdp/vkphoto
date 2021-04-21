<template>
  <div class="likes">
    <slot />
    <span
      class="likes__btn"
      :class="{'likes__btn--red': active}"
    >
      <svg>
        <use xlink:href="#like"></use>
      </svg>
    </span>
  </div>
</template>

<script>
export default {
  props: ['active']
}
</script>
