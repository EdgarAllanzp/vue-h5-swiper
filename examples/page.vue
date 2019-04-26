<template>
  <div
    class="page"
    :style="{
      background: bgColor
    }"
  >
    {{ index }}
  </div>
</template>

<script>
export default {
  props: {
    index: {
      type: Number,
      default: -1
    },

    bgColor: {
      type: String,
      default: ''
    }
  }
};
</script>

<style lang="scss">
.page {
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: grey;
}
</style>
