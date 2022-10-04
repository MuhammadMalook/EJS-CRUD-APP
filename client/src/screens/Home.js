import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home() {
    const [users, setUsers] = useState()
    const [token,setToken] = useState(localStorage.getItem("token"))
    const navigate = useNavigate()

  const checkToken = async() => {
        console.log(token)
        const response = await fetch('/users', {
            method:"GET",
            headers:{
                "Content-type":"applicaiton/json",
                'Authorization': token
            },
        })
        const jsonData = await response.json()
        console.log(jsonData,"jsonDAta")
        if(jsonData.success)
        {
            setUsers(jsonData.user)
        }
        else {
            localStorage.clear()
            navigate('/')
            setToken(null)

        }
    }

    useEffect(()=>{
       
            checkToken()
            return () => {
                console.log('This will be logged on unmount');
              };

    },[])
  return (
    
        users ? <table class="table table-hover">
          <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td colspan="2">Larry the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>

      </table> : <div>no data available</div>
    
  )
}
