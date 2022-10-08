import React, { useEffect, useState, CSSProperties } from 'react'
import { useNavigate } from 'react-router-dom'
import BounceLoader from 'react-spinners/BounceLoader';
import ClipLoader from "react-spinners/BounceLoader";
import '../assets/home.css'

// import image from '../../../backend/uploads/'
// import image from '../assets/logo.png'
// const override: CSSProperties = {
//     display: "block",
//     margin: "0 auto",
//     borderColor: "red",
//   };

export default function Home() {

    const baseUrl = process.env.REACT_APP_BASE_URL
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [token,setToken] = useState(localStorage.getItem("token"))
    const navigate = useNavigate()

  const checkToken = async() => {
        setLoading(true)
        
        var auth = "Bearer ".concat(JSON.parse(token))
        const response = await fetch('/users', {
            method:"GET",
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Authorization": auth,
            },
        })
        const jsonData = await response.json()
        console.log(jsonData,"jsonDAta")
        if(jsonData.success)
        {
            setUsers(jsonData.user)
            setLoading(false)
        
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
<> 
    {
        loading && <BounceLoader color={"green"} cssOverride={{
            display: "block",
            margin: "0 auto",
            borderColor: "red",
          }}  size={60} aria-label="Loading Spinner" />
    }
 { !loading ? <div className='container'>
   

     <table class="table table-hover align-middle">
         
        <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">FullName</th>
                <th scope="col">Phone</th>
                <th scope='col'>Profile image</th>
                <th scope="col">Actions</th>
                </tr>
        </thead>

            {users.map((user,index)=>{
                const base64String = btoa(
                    String.fromCharCode(...new Uint8Array(user.imageUrl.data.data))
                  );
                return  <tbody>
                            <tr>
                                <th scope="row">{index+1}</th>
                                <td>{user.fullname}</td>
                                <td>{user.phone}</td>
                                
                                <td>
                                    <div class="img img-responsive">
                                            <img class="img img-fluid border rounded-circle" src={`data:image/png;base64,${base64String}`} width="70"/>
                                    </div>
                                </td>
                                <td>
                                    <div className='col-md-8 col-sm-8 offset-2' >
                                        <div className='row'>
                                        <div className='col-md-4 col-sm-12'>
                                            <button class="btn btn-outline-primary w-100" type="button">VIEW</button>
                                        </div>
                                        <div className='col-md-4 col-sm-12'>
                                            <button class="btn btn-outline-warning  w-100" type="button">EDIT</button>
                                        </div>
                                        <div className='col-md-4 col-sm-12'>
                                            <button class="btn btn-outline-danger   w-100 " type="button">DELETE</button>
                                        </div>
                                        </div>
                                       
                                    </div>

                                        {/* <div class="d-grid gap-2 d-md-block ">
                                            <button class="btn btn-outline-primary " type="button">VIEW</button>
                                            <button class="btn btn-outline-primary " type="button">EDIT</button>
                                            <button class="btn btn-outline-primary " type="button">DELETE</button>
                                        </div> */}
                                </td>   

                            </tr>
                        </tbody>
            })
            
            }
        </table> 
        <input type={"button"} value={"Add New Person"} className="btn btn-dark mybtn" onClick={()=>{
                    navigate('/adduser')

        }}/>
    
     </div>: <div></div>
}
     </>
    
  )
}
