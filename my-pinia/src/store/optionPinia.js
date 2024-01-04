// import {defineStore} from "pinia";
import { defineStore } from '@/pinia'

const useOptionStore = defineStore('optionStore', {
    state: () => ({
        list: [],
        name: { eat: '222' },
    }),
    getters: {
        count() {
            return this.list.length
        }
    },
    actions: {
        add(item) {
            this.list.push(item)
        },
        updateStatus(data){
            this.list = this.list.map(item => {
                if(item.id === data.id) item.complete = !item.complete;
                return item
            })
        }
    }
})
export default useOptionStore;
