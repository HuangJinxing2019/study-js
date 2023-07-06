<template>
  <div class="image-preview">
    <direction-icon :dir="DIR.BACK" @image-slide="imageSlide"></direction-icon>
    <direction-icon :dir="DIR.FOR" @image-slide="imageSlide"></direction-icon>
    <control-bar
      @image-rotate="imageRotate"
      @image-scale="imageScale"
    ></control-bar>
    <div class="slider" :style="{
      width: preivewWidth + 'px',
      transform: `translate3d(-${ sliderLeft }px, 0, 0)`
    }">
      <image-container
        v-for="item of state.imageData"
        :key="item.id"
        :image="item.image"
        :rotate="item.rotate"
        :scale="item.scale"
      ></image-container>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import ImageContainer from './ImageContainer.vue';
  import DirectionIcon from './DirectionIcon.vue';
  import ControlBar from './ControlBar.vue';
  import { DIR, IImages, IReactive, ROTATE, ZOOM } from './types';
  import { reactive, computed } from 'vue';

  const props = defineProps<{
    images: IImages[]
  }>();
  
  const state = reactive<IReactive>({
    index: 0,
    imageData: props.images
  });

  const sliderLeft = computed(() => state.index * 440);
  
  const imgLen = props.images.length;
  const preivewWidth = imgLen * 440;

  const imageSlide = (dir: DIR): void => {
    const index = state.index;

    switch (dir) {
      case DIR.FOR:
        state.index = index >= imgLen - 1 ? 0 : index + 1;
        break;
      case DIR.BACK:
        state.index = index === 0 ? imgLen - 1 : index - 1;
        break;
      default:
        break;
    } 

    imageReset();
  }

  const imageRotate = (dir: ROTATE): void => {
    const rotate = state.imageData[state.index].rotate;

    switch (dir) {
      case ROTATE.LEFT:
        state.imageData[state.index].rotate = rotate - 10;
        break;
      case ROTATE.RIGHT:
        state.imageData[state.index].rotate = rotate + 10;
        break;
      default:
        break;
    }
  }

  const imageScale = (zoom: ZOOM): void => {
    const scale = state.imageData[state.index].scale;

    switch (zoom) {
      case ZOOM.IN:
        scale < 3 && (state.imageData[state.index].scale += .1);
        break;
      case ZOOM.OUT:
        scale > .2 && (state.imageData[state.index].scale -= .1);
        break;
      default:
        break;
    }
  }

  const imageReset = () => {
    const target = state.imageData[state.index];
    
    target.rotate = 0;
    target.scale = 1;
  }
</script>

<style lang="scss" scoped>
.image-preview {
  position: relative;
  width: 440px;
  height: 248px;
  overflow: hidden;

  .slider {
    position: absolute;
    top: 0;
    left: 0;
    transition: transform .3s;
  }
}
</style>