import {computed} from "vue";

function todoReducer(data){

    function add(value){
        data.push({
            id: new Date().getTime(),
            text: value,
            complete: false,
        })
    }
    function completeChange(id){
        data.map(item => {
            if(item.id === id){
                item.complete = !item.complete
            }
            return item
        })
    }
    function deleteChange(id){
        return data = data.filter(item => item.id !== id)
    }
    return {
        add,
        completeChange,
        deleteChange,
    }
}

export default todoReducer