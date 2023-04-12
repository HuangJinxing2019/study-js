<template>
  <div>
    <div v-tabs="{
      tabClass: 'tab-item',
      activeClass: 'active',
      currentIndex
    }">
      <a
          class="tab-item"
          @click.prevent="tabChange(index)"
          v-for="(item, index) of data">
        {{item.title}}
      </a>
    </div>
    <div class="content">
      {{data[currentIndex].content}}
    </div>
  </div>
</template>

<script>
import tabs from "../directives/tabs";
export default {
  name: "MyTabs",
  props: {
    initialIndex: {
      type: [String, Number],
      default: 0
    },
    data: {
      type: Array,
      default: () => ([])
    }
  },
  directives: {
    tabs
  },
  data(){
    return {
      currentIndex: this.initialIndex,
    }
  },
  methods: {
    tabChange(index){
      this.currentIndex = index
    }
  }
}
</script>

<style lang="scss" scoped>
  .tab-item{
    &.active{ color: red }
  }
</style>