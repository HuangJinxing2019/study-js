<template>
  <div>
      <form @submit.prevent="submitChange">
        <input type="text" v-model.trim="value">
      </form>
  </div>
</template>

<script>
export default {
  name: "From",
  data(){
    return {
      value: '',
    }
  },
  methods:{
    submitChange(){
      if(!this.value) return
      this.$emit('dispatcher', 'ADD', this.value)
      this.value = ''
    },
  }
}
</script>

<style scoped>

</style>