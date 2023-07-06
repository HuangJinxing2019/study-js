<template>
  <span :class="['iconfont', `icon-${ dir }ward`]" @click="imageSlide(dir)"></span>
</template>

<script lang="ts" setup>
import { DIR } from './types';

const props = defineProps<{
  dir: DIR
}>();

const emit = defineEmits<{
  imageSlide: [dir: DIR] 
}>()

const imageSlide = (dir: DIR): void => {
  emit('imageSlide', dir);
}

</script>

<style lang="scss" scoped>
.iconfont {
  position: absolute;
  top: 110px;
  z-index: 1;
  color: #fff;
  font-size: 25px;
  font-weight: bold;
  text-shadow: 1px 3px 5px #000;
  cursor: pointer;
  transition: text-shadow .3s;

  &:hover {
    text-shadow: 1px 2px 3px #000;
  }

  &.icon-backward {
    left: 20px;
  }

  &.icon-forward {
    right: 20px;
  }
}
</style>