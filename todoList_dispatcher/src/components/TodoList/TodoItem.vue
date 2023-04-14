<template>
  <div>
    <span :class="{complete: itemData.complete}">{{itemData.text}}</span>
    <input type="checkbox" :checked="itemData.complete" @change="completeChange">
    <button @click="deleteChange">删除</button>
  </div>
</template>

<script>
export default {
  name: "TodoItem",
  props: {
    itemData: Object,
  },
  methods: {
    completeChange(){
      this.$emit('completeChange', 'COMPLETE_CHANGE', this.itemData.id)
    },
    deleteChange(){
      this.$emit('deleteChange', 'DELETE_CHANGE', this.itemData.id)
    }
  }
}
</script>

<style scoped>
  .complete{
    text-decoration: line-through;
  }
</style>