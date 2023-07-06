<template>
  <div class="image-container">
    <img 
      :src="require(`../../assets/images/${ image }`)"
      :style="{
        transform: `rotate(${ rotate }deg) scale(${ scale })`
      }"
    />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  image: string,
  scale: number,
  rotate: number
}>();  
</script>

<style lang="scss" scoped>
.image-container {
  float: left;
  width: 440px;
  height: 248px;

  img {
    width: 100%;
    height: 100%;
    transition: all .3s;
  }
}
</style>