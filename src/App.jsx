import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import "./App.css"

const App = () => {
  const [showBtn, setShowBtn] = useState(true)
  // const todo = useRef()
  const [data, setData] = useState(null)
  const [editValue, setEditValue] = useState('')
  const todo  = useRef()


  useEffect(() => {
    
      axios.get("https://backend-hello-api.vercel.app/api/v1/users")
      .then((res) => {
        setData(res.data)
      }).catch((err) => {
        console.log(err);
      })
    
  }, [data])




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
        console.log(res.data);
        todo.current.value = ''
      }).catch((err) => {
        console.log(err);
      })
  }

  // Deleting data from server//

  function deletetodo(id) {
    axios.delete(`https://backend-hello-api.vercel.app/api/v1/users/${id}`)
      .then((res) => {
        console.log(res.data);
      }).catch((err) => {
        console.log(err);
      })
  }



  // Updateing data //
  function saveEdit(id) {
    setShowBtn(true);
    if (editValue === "") {
      alert("Please Enter  a Task");
      return
    }
    axios.put(`https://backend-hello-api.vercel.app/api/v1/users/${id}`,
      {
        editValue: editValue
      })
      .then((res) => {
        console.log(res.data);
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
      <div className="  flex justify-center">
        <div className=" bg-black w-[550px] h-[400px] rounded  ">
          <div className="p-5 parent ">
            {data ? data.map((item) => {
              return <div className='flex' key={item.id}>
                {showBtn ? <div>
                  <h4 className='text-lg mt-8 ' >{item.todo}
                  <button onClick={() => setShowBtn(false)} className="childtwo btn btn-warning w-16 ">EDIT</button>
                  <button onClick={() => deletetodo(item.id)} className="child btn btn-error w-20 ml-3 ">DELETE</button>
                </h4>
                </div>
                  : <div className='flex  ' key={item.id}>
                        <div>
                          <input onChange={(e) => setEditValue(e.target.value)} type="text" placeholder="Edit Value" className="input  input-bordered input-primary w-[350px] max-w-lg" />
                        </div>
                      <div><button onClick={() => saveEdit(item.id)} className="btn btn-active ml-5 btn-primary">Save Edit</button></div>

                  </div>}
              </div>

            })


              : <h1>Loading... </h1>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App




