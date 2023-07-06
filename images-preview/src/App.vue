<template>
  <image-preview :images="data"></image-preview>
</template>

<script lang="ts" setup>
import ImagePreview from './components/ImagePreview/index.vue';

const data = [
  {
    id: 1,
    image: '1.jpeg',
    rotate: 0,
    scale: 1
  },
  {
    id: 2,
    image: '2.jpeg',
    rotate: 0,
    scale: 1
  },
  {
    id: 3,
    image: '3.jpeg',
    rotate: 0,
    scale: 1
  },
  {
    id: 4,
    image: '4.jpeg',
    rotate: 0,
    scale: 1
  },
  {
    id: 5,
    image: '5.jpeg',
    rotate: 0,
    scale: 1
  },
  {
    id: 6,
    image: '6.jpeg',
    rotate: 0,
    scale: 1
  }
]
</script>
