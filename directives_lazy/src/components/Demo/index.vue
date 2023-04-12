<template>
  <div class="demo">
    <img class="img" v-lazy="item" alt="" v-for="(item, index) of images" :key="index">
  </div>
</template>

<script>
export default {
  name: "Demo",
  data(){
    return {
      images: [
        'https://th.wallhaven.cc/lg/m3/m3zjx1.jpg',
        'https://th.wallhaven.cc/lg/1p/1ppld1.jpg',
        'https://th.wallhaven.cc/lg/yx/yxqzpd.jpg',
        'https://th.wallhaven.cc/small/l8/l83o92.jpg',
        'https://th.wallhaven.cc/small/7p/7p39gy.jpg',
        'https://th.wallhaven.cc/small/qz/qzdqvr.jpg',
        'https://th.wallhaven.cc/small/kx/kx36mq.jpg',
        'https://th.wallhaven.cc/small/m9/m9xyg8.jpg',
        'https://th.wallhaven.cc/small/6o/6oxgp6.jpg',
        'https://th.wallhaven.cc/small/l3/l3xk6q.jpg',
        'https://th.wallhaven.cc/small/57/57o9j5.jpg',
        'https://th.wallhaven.cc/small/k7/k7q9m7.jpg'
      ]
    }
  },
}
</script>

<style lang="scss" scoped>
  .demo{
    width: 100%;
    height: 50vh;
    overflow: auto;
    .img{
      width: 100%;
      height: 500px;
    }
  }
</style>