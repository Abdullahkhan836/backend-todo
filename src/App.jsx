import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import "./App.css"
import Card from './Card'

const App = () => {
  // const todo = useRef()
  const [data, setData] = useState(null)
  const todo  = useRef()


  useEffect(() => {
    
      axios.get("https://backend-hello-api.vercel.app/api/v1/users")
      .then((res) => {
        setData(res.data)
        console.log(res.data);
      }).catch((err) => {
        console.log(err);
      })
    
  }, [addTodo])




  // sending data to server//

  function addTodo(e) {
    e.preventDefault()
    if (todo.current.value.trim() === "") {
      alert("Please Enter  a Task");
      return
    }
    axios.post("https://backend-hello-api.vercel.app/api/v1/users", {
      todo: todo.current.value
    })
      .then((res) => {
        todo.current.value = ''
      }).catch((err) => {
        console.log(err);
      })
  }

  
  return (
    <div >
      <div className='m-16 '>
        <form className='flex justify-center ' onSubmit={addTodo}>
          <input ref={todo} type="text" placeholder="Enter Todo" className="input input-bordered input-primary w-[400px] " />
          <button type='submit' className=" ml-5 btn btn-active btn-primary">ADD TODO</button>


        </form>
      </div>
      {data ? data.map((item) => {
        return <Card key={item.id} todo={item.todo} id={item.id}/>       

      }): <h1>Loading...</h1>}
      
    </div>
  )
}

export default App




