<template>
  <my-tabs :data="tabData" initial-index="0"></my-tabs>
</template>

<script>
import MyTabs from "./components/MyTabs";
export default {
  name: "App",
  components: { MyTabs },
  data(){
    return {
      tabData: [
        {
          id: 1,
          title: '选项1',
          content: '内容1'
        },
        {
          id: 2,
          title: '选项2',
          content: '内容2'
        },
        {
          id: 3,
          title: '选项3',
          content: '内容3'
        },
        {
          id: 4,
          title: '选项4',
          content: '内容4'
        },
      ],
      initialIndex: 2
    }
  },
}
</script>

<style scoped>

</style>