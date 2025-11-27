import { createContext, useContext } from "react";

export const TodoContext = createContext({

    Todos:[
        {
            id:1,
            Todo : "Todo msg",
            completed : false,
        }
    ],
    //define the function use in my context
    addTodo : (Todo) =>{},
    UpdateTodo : (id, Todo) =>{},
    deleteTodo : (id) =>{},
    ToggleComplete : (id) =>{}
});

export const TodoContextProvider = TodoContext.Provider;

export const useTodo =()=>{ // custom hook create kra h 
    return useContext(TodoContext);

}
















