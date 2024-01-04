// import {defineStore} from "pinia";
import { defineStore } from '@/pinia'
import { ref, computed } from "vue";

const setupStore = defineStore('setupStore', () => {
    const list = ref([]);
    const name = ref('111');
    const count = computed(() => list.value.length);
    function add(data){
        list.value.push(data)
    }
    function updateStatus(data){
        list.value = list.value.map(item => {
            if(item.id === data.id) item.complete = !item.complete;
            return item
        })
    }
    return {
        list,
        name,
        count,
        add,
        updateStatus,
    }
})
export default setupStore
