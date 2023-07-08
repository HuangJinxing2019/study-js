<template>
  <div>
    <selector
      default-title="请选择 - 省"
      :is-show="isProvinceSelectShow"
      :data="provinces"
      code-key="provinceCode"
      name-key="provinceName"
      @handle-change="handleProvinceChange"
    ></Selector>
    <selector
      default-title="请选择 - 市"
      :is-show="isCitySelectShow"
      :data="state.cities"
      code-key="cityCode"
      name-key="cityName"
      @handle-change="handleCityChange"
    ></Selector>
    <selector
      default-title="请选择 - 区县"
      :is-show="isDistrictSelectShow"
      :data="state.districts"
      code-key="countyCode"
      name-key="countyName"
      @handle-change="handleDistrictChange"
    ></Selector>
  </div>
</template>

<script setup>
  import Selector from './Selector';
  import { reactive, computed, toRaw } from 'vue';

  const props = defineProps({
    data: Object
  });

  const emit = defineEmits(['handleSelect']);

  const provinces = formatData(props.data);
  
  const isProvinceSelectShow = computed(() => !!provinces);
  const isCitySelectShow = computed(() => !!state.cities);
  const isDistrictSelectShow = computed(() => !!state.districts);

  const state = reactive({
    cities: null,
    districts: null,
    selectedInfo: {
      province: null,
      city: null,
      district: null
    }
  });

  const handleProvinceChange = (value) => {

  if (!value) {
    state.selectedInfo.province = null;
    state.cities = null;
    return;
  }

  const [ code, name ] = value.split(':');
  state.selectedInfo.province = {
    code,
    name
  };
  state.cities = provinces[name].cities; 
}

const handleCityChange = (value) => {

  if (!value) {
    state.selectedInfo.city = null;
    state.districts = null;
    return;
  }

  const [ code, name ] = value.split(':');
  state.selectedInfo.city = {
    code,
    name
  };
  state.districts = state.cities[name].counties;
}

const handleDistrictChange = (value) => {

  if (!value) {
    state.selectedInfo.district = null;
    return;
  }

  const [ code, name ] = value.split(':');
  state.selectedInfo.district = {
    code,
    name
  };

  emit('handleSelect', toRaw(state.selectedInfo));
}

function formatData (data) {
  return data.reduce((prev1, next1) => {
    next1.cities = next1.cities.reduce((prev2, next2) => {
      next2.counties = next2.counties.reduce((prev3, next3) => {
        prev3[next3.countyName] = next3;
        return prev3;
      }, {});
      prev2[next2.cityName] = next2;
      return prev2;
    }, {});
    prev1[next1.provinceName] = next1;
    return prev1;
  }, {});
}
</script>