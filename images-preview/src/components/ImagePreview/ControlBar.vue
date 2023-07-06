<template>
<div class="control-bar">
  <span class="iconfont icon-rotate-left" @click="imageRotate(ROTATE.LEFT)"></span>
  <span class="iconfont icon-rotate-right" @click="imageRotate(ROTATE.RIGHT)"></span>
  <span class="iconfont icon-bigger" @click="imageScale(ZOOM.IN)"></span>
  <span class="iconfont icon-smaller" @click="imageScale(ZOOM.OUT)"></span>
</div>  
</template>

<script lang="ts" setup>
import { ROTATE, ZOOM } from './types';

const emit = defineEmits<{
  imageRotate: [dir: ROTATE],
  imageScale: [ZOOM: ZOOM]
}>();

const imageRotate = (dir: ROTATE): void => {
  emit('imageRotate', dir);
}

const imageScale = (zoom: ZOOM): void => {
  emit('imageScale', zoom);
}
</script>

<style lang="scss" scoped>
.control-bar {
  position: absolute;
  left: 50%;
  bottom: 30px;
  z-index: 1;
  width: 120px;
  height: 30px;
  margin-left: -60px;

  .iconfont {
    color: #fff;
    font-size: 30px;
    font-weight: bold;
    text-shadow: 1px 3px 5px #000;
    cursor: pointer;
    transition: text-shadow .3s;

    &:hover {
      text-shadow: 1px 2px 3px #000;
    }
  }
}
</style>