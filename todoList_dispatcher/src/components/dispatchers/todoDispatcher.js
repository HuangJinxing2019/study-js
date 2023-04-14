import todoReducer from "../reducers/todoReducer";
import {ADD, COMPLETE_CHANGE, DELETE_CHANGE} from "../actions/todoAction";

export default (data) => {
    const { add, completeChange, deleteChange } = todoReducer(data.todoList)
    return (type, ...args) => {
        switch (type){
            case ADD:
                add(...args)
                break;
            case COMPLETE_CHANGE:
                completeChange(...args);
                break;
            case DELETE_CHANGE:
                data.todoList = deleteChange(...args);
                break;
            default:
                break;
        }
    }
}