<template>
  <div class="led-lamp" :class="{ 'led-green': active }"></div>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style>
.led-lamp {
  display: inline-block;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  border: 1px solid #8f8d8d;
}

.led-green {
  background-color: green;
}
</style>