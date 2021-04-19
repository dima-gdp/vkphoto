<template>
  <div class="lds-ring" :style="{ width: `${size}px`, height: `${size}px` }">
    <div
      :style="{
        borderColor: `${color} transparent transparent transparent`,
        borderWidth: `${borderWidth}px`,
      }"
    ></div>
    <div
      :style="{
        borderColor: `${color} transparent transparent transparent`,
        borderWidth: `${borderWidth}px`,
      }"
    ></div>
    <div
      :style="{
        borderColor: `${color} transparent transparent transparent`,
        borderWidth: `${borderWidth}px`,
      }"
    ></div>
    <div
      :style="{
        borderColor: `${color} transparent transparent transparent`,
        borderWidth: `${borderWidth}px`,
      }"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 64
    },
    borderWidth: {
      type: Number,
      default: 6
    },
    color: {
      type: String,
      default: 'burlywood'
    }
  }
}
</script>

<style lang="scss">
.lds-ring {
  display: block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  border-style: solid;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #fff transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
