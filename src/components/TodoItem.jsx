import React, {useState} from 'react'
import { useTodo } from '../Contexts/TodoContext';
function TodoItem({ todo }) {

    // first of all accessing all the value from the todoContext
    // using useTodo()
    const {ToggleComplete,UpdateTodo,deleteTodo,} = useTodo(); 

    //? ye bataega ki mera todo editable h yaa nhi 
    //? initally marking the todo not updatable it will only active when i click on i
    const [isTodoEditable, setIsTodoEditable] = useState(false) 
    
    //* jb me edit key pr click  krunga tb state change hokr editable state bnegi
    //* i set initially todo.todo becasue when i click on editable key it initally show my prvious todomsg on that 
    const [todoMsg , setTodoMsg] = useState(todo.todo) ;

    //? todo me edit kese hoga kya process hogi 
    const editTodo =() =>{
        //* update todo ke andar 2 parameter chahie
        //* todo ko spread kr lia aur usme se sirft todo ke msg ko update kr dia 
        UpdateTodo(todo.id,{...todo, todo:todoMsg});

        // ab mera todo edit ho chuka h to use ab state ko false mark kr do 
        setIsTodoEditable(false);
        

    }
    const toggleCompleted =()=>{
        ToggleComplete(todo.id);
    }
      
    return (
        <div
            className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
                todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
            }`}
        >
            <input
                type="checkbox"
                className="cursor-pointer"
                checked={todo.completed}
                onChange={toggleCompleted}
            />
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg ${
                    isTodoEditable ? "border-black/10 px-2" : "border-transparent"
                } ${todo.completed ? "line-through" : ""}`}
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
            />
            {/* Edit, Save Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                onClick={() => {
                    if (todo.completed) return;

                    if (isTodoEditable) {
                        editTodo();
                    } else setIsTodoEditable((prev) => !prev);
                }}
                disabled={todo.completed}
            >
                {isTodoEditable ? "📁" : "✏️"}
            </button>
            {/* Delete Todo Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                onClick={() => deleteTodo(todo.id)}
            >
                ❌
            </button>
        </div>
    );
}

export default TodoItem;
