<template>
  <div>
    <!-- <select @change="handleProvinceChange">
      <option value="">请选择 - 省</option>
      <option
        v-for="(info, provinceName) in provinces"
        :value="`${ info.provinceCode }:${ info.provinceName }`"
      >{{  provinceName  }}</option>
    </select>
    <select @change="handleCityChange" v-if="citySelectShow">
      <option value="">请选择 - 市</option>
      <option
        v-for="(info, cityName) in state.cities"
        :value="`${ info.cityCode }:${ info.cityName }`"
      >{{  cityName  }}</option>
    </select>
    <select @change="handleDistrictChange" v-if="districtsSelectShow">
      <option value="">请选择 - 区县</option>
      <option
        v-for="(info, countyName) in state.districts"
        :value="`${ info.countyCode }:${ info.countyName }`"
      >{{  countyName  }}</option>
    </select> -->
    <union-selectors 
      :data="data"
      @handle-select="handleSelect"
    ></union-selectors>
  </div>
</template>

<script setup>
import UnionSelectors from './components/UnionSelectors';
import data from './city';

const handleSelect = (info) => {
  console.log(info);
}
// import { reactive, computed, toRaw } from 'vue';

// const provinces = formatData(data);

// const state = reactive({
//   cities: null,
//   districts: null,
//   selectedInfo: {
//     province: null,
//     city: null,
//     district: null
//   }
// });

// const citySelectShow = computed(() => state.cities);
// const districtsSelectShow = computed(() => state.districts);


// const handleProvinceChange = (e) => {
//   const value = e.target.value;

//   if (!value) {
//     state.selectedInfo.province = null;
//     state.cities = null;
//     return;
//   }

//   const [ code, name ] = e.target.value.split(':');
//   state.selectedInfo.province = {
//     code,
//     name
//   };
//   state.cities = provinces[name].cities; 
// }

// const handleCityChange = (e) => {
//   const value = e.target.value;

//   if (!value) {
//     state.selectedInfo.city = null;
//     state.districts = null;
//     return;
//   }

//   const [ code, name ] = e.target.value.split(':');
//   state.selectedInfo.city = {
//     code,
//     name
//   };
//   state.districts = state.cities[name].counties;
// }

// const handleDistrictChange = (e) => {
//   const value = e.target.value;

//   if (!value) {
//     state.selectedInfo.district = null;
//     return;
//   }

//   const [ code, name ] = e.target.value.split(':');
//   state.selectedInfo.district = {
//     code,
//     name
//   };

//   console.log(toRaw(state.selectedInfo));
// }

// function formatData (data) {
//   return data.reduce((prev1, next1) => {
//     next1.cities = next1.cities.reduce((prev2, next2) => {
//       next2.counties = next2.counties.reduce((prev3, next3) => {
//         prev3[next3.countyName] = next3;
//         return prev3;
//       }, {});
//       prev2[next2.cityName] = next2;
//       return prev2;
//     }, {});
//     prev1[next1.provinceName] = next1;
//     return prev1;
//   }, {});
// }
</script>
