import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import "./App.css"

const App = () => {
  const [showBtn, setShowBtn] = useState(true)
  const todo = useRef()
  const [data, setData] = useState(null)
  const [editValue, setEditValue] = useState('')


  useEffect(() => {
    // get data from server
    axios.get("http://localhost:3000/api/v1/users")
      .then((res) => {
        setData(res.data)
      }).catch((err) => {
        console.log(err);
      })
  }, [data])

  function deletetodo(id) {
    axios.delete(`http://localhost:3000/api/v1/users/${id}`)
      .then((res) => {
        console.log(res.data);
      }).catch((err) => {
        console.log(err);
      })
  }

  function saveEdit(id) {
    setShowBtn(true);
    axios.put(`http://localhost:3000/api/v1/users/${id}`,
      {
        editValue: editValue
      })
      .then((res) => {
        console.log(res.data);
      }).catch((err) => {
        console.log(err);
      })
  }






  function addTodo(e) {
    e.preventDefault()
    if( todo.current.value === ""){
      alert("Please Enter  a Task");
      return
    }
    axios.post("http://localhost:3000/api/v1/users", {
      todo: todo.current.value
    })
      .then((res) => {
        console.log(res.data);
        todo.current.value = '';
      }).catch((err) => {
        console.log(err);
      })
  }


  return (
   <div >
     <div className='m-16 '>
      <form  className='flex justify-center ' onSubmit={addTodo}>
        <input ref={todo} type="text" placeholder="Enter Todo" className="input input-bordered input-primary w-[400px] " />
        <button type='submit' className=" ml-5 btn btn-active btn-primary">ADD TODO</button>


      </form>
    </div>
    <div className="  flex justify-center">
    <div className=" bg-black w-[550px] h-[400px] rounded  ">
      <ul className="p-5 parent ">
        {data ? data.map((item) => {
          return <div className='flex' key={item.id}>
            {showBtn ? <li className='text-lg mt-8 flex justify-between' >{item.todo}
              <button  onClick={() => setShowBtn(false)} className="childtwo btn btn-warning w-16 ">EDIT</button>
              <button onClick={() => deletetodo(item.id)} className="child btn btn-error w-20 ml-3 ">DELETE</button>
              </li>
              : <div key={item.id}>
                <input onChange={(e) => setEditValue(e.target.value)} type="text" placeholder="Edit Value" className="input input-bordered input-primary w-full max-w-xs" />

                <button onClick={() => saveEdit(item.id)} className="btn btn-active btn-primary">Save Edit</button>
              </div>}
          </div>

        })


          : <h1>Loading... </h1>}
      </ul>
    </div>
    </div>
   </div>
  )
}

export default App



 
