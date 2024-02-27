import React, { useState } from 'react'
import "./App.css"
import axios from 'axios';
const Card = ({ todo, id }) => {

    const [showBtn, setShowBtn] = useState(true)
    const [editValue, setEditValue] = useState('')


    
  function deletetodo(id) {
    axios.delete(`https://backend-hello-api.vercel.app/api/v1/users/${id}`)
      .then((res) => {
        console.log(res.data);
      }).catch((err) => {
        console.log(err);
      })
  }


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


        <div className="flex justify-center mb-3">
            <div className=" bg-black w-[550px] h-[80px] rounded  ">
                <div className="p-5 parent ">
                    <div className='flex' key={id}>
                        {showBtn ? 
                            <h4 className='text-lg mt-[8px] ' >{todo}
                                <button onClick={() => setShowBtn(false)} className="childtwo btn btn-warning w-16 ">EDIT</button>
                                <button onClick={() => deletetodo(id)} className="child btn btn-error w-20 ml-3 ">DELETE</button>

                            </h4>
                           
                      
                            : <div className='flex  ' key={id}>
                                <div>
                                    <input onChange={(e) => setEditValue(e.target.value)} type="text" placeholder="Edit Value" className="input  input-bordered input-primary w-[350px] max-w-lg" />
                                </div>
                                <div><button onClick={() => saveEdit(id)} className="btn btn-active ml-5 btn-primary">Save Edit</button></div>

                            </div>}
                    </div>
                </div>
            </div>
        </div>


    )
}

export default Card