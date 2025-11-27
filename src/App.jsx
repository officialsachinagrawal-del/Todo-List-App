import React, { useEffect } from 'react'
import './App.css'
import { TodoContextProvider } from './Contexts/TodoContext';
import {useState} from "react";
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';

function App() {
   
  // i Create this state to store all  todos value 
  //* this state todos and iside value attribute todos both are different todos
  const [todos, setTodos] = useState(() =>{
    const todo = localStorage.getItem("todos1");
    return todo ? JSON.parse(todo) : [];
  });
    
  const addTodo = (todo) =>{
    // ho saktea h mere todo ke paass already value ho to 
    //! setTodos(todo) // me ese krta to purani sabhi value khtml ho jaati 
    // prev ki help se puraani saari value access ho gyi 
    setTodos ((prev) =>[{id : Date.now(), ...todo} ,...prev])
    // setTodos(todo)...todo}

  }
  const deleteTodo = (id) =>{
    //access from the local storge 
    //* filter i use becz  => me delete kr dunga aur nayi array banuanga jisme vo pahle waali array ki id naa ho 
    //* use remove krke nayi array banaunga 
    //*mtlb us array ko remove krke nayi array banana usme use chhodke baaki saari array ko daalna 
    setTodos((prev) => prev.filter((PrevTodo) => (PrevTodo.id != id)))

   }
  const UpdateTodo = (id , todo ) =>{
    //* through a call back function in settodos we accessing all the previous in my todo list
    //?PrevTodo.id => ye teri hr ek array ko access krega id ke through

    setTodos((prev) => prev.map((PrevTodo) => (PrevTodo.id === id ? todo : PrevTodo))
    )


  }
  const ToggleComplete =(id) =>{
    //! kya ye PrevTodo.id vahi wala h jo mene id pass ki h  => tabhi to me uske andar update krunga 
    //? ...PrevTodo, => baaki saari value to as it rakho (id,todomsg,complted) but complted to nikalo aur use toggle kro 
    setTodos((prev) => (prev.map((PrevTodo) =>(PrevTodo.id  === id ? {...PrevTodo, completed: !PrevTodo.completed}: PrevTodo

    ))))


  }
  //! application jb first time(refresh) run hoti h to saare todo ek saath run ho jaate 
  //! ye query krega jo ki local storage se saari value leke aao  aur use usestate waale todo me store kro 
  // mere ui pe dikhao aake 
  //   useEffect(() => {

  //   const todos = JSON.parse(localStorage.getItem("todos1")) // convert string to js object

  //   if(todos && todos.length>0 ){ // && todos.length>0
  //     console.log(todos)
  //     setTodos(todos)
       
  //   }
  // }, []);



  // ab local storage me data ko set krunga 
  useEffect(() => {
    localStorage.setItem("todos1", JSON.stringify(todos)) //? convert js object of todo from first UseEffeect hook into string 

  
   {/* todos isme useState waala h */}
  }, [todos]) 
  


  



  return (
    <TodoContextProvider value={{todos, deleteTodo,addTodo,UpdateTodo, ToggleComplete}}>
    <div className="bg-[#172842] min-h-screen py-8 w-full">

                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-5">
                        {/* Todo form goes here */}
                        <TodoForm/>
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo) =>(
                          <div key = {todo.id}
                          className='w-full'
                          >

                            <TodoItem   todo = {todo}/>
                            
                            </div>

                        ))
                      }
                    </div>
                </div>
            </div>

    </TodoContextProvider>
     )
}

export default App;
