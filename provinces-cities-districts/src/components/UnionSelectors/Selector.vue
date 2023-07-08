<template>
  <select @change="handleChange" v-if="isShow">
    <option value="">{{ defaultTitle }}</option>
    <option
      v-for="(info, name) in data"
      :value="`${ info[codeKey] }:${ info[nameKey] }`"
    >{{  name  }}</option>
  </select>
</template>

<script setup>
  const props = defineProps({
    defaultTitle: {
      type: String,
      default: 'Default'
    },
    isShow: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: () => ({})
    },
    codeKey: String,
    nameKey: String
  })

  const emit = defineEmits(['handleChange']);

  const handleChange = (e) => {
    emit('handleChange', e.target.value);
  }
</script>