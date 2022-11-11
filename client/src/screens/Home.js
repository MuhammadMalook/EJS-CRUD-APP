import React, { useEffect, useState, CSSProperties } from 'react'
import { useNavigate } from 'react-router-dom'
import BounceLoader from 'react-spinners/BounceLoader';
import ClipLoader from "react-spinners/BounceLoader";
import '../assets/home.css'
import BounceLoader from 'react-spinners/BounceLoader';

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
    //const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const checkToken = async() => {
        setLoading(true)
        var auth = "Bearer ".concat(JSON.parse(token))
        console.log(auth)
    if(token){
        const response = await fetch('/users', {
            method:"GET",
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Authorization": auth,
            },
        })
        console.log(response)
      
        if(response.statusText == "Unauthorized") {
            console.log("heeereree")
            localStorage.clear()
            navigate('/')
            setToken(null)

        }
        else{
           
        const jsonData = await response.json()
        
        console.log(jsonData.user,"jsonDAta")
        
         if(jsonData.success)
        {
            setTimeout(()=>{
                setUsers(jsonData.user)
                setLoading(false)
            },300)
           
        }
        else {
            console.log("heeereree")
            localStorage.clear()
            navigate('/')
            setToken(null)

        }
    }
}
    else{
   
    navigate('/')
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
        //style="background-color: #ebebeb; box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset; margin: 5%; border-radius: 20px;"
        loading && <BounceLoader color={"green"} cssOverride={{
            display: "block",
            margin: "0 auto",
            borderColor: "red",
          }}  size={60} aria-label="Loading Spinner" />
    }
{
!loading && users.length > 0 ? <div className='container' style={{backgroundColor:"#ebebeb", boxShadow:" box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",margin:"5%", borderRadius:"20px" }}>
    <table class="table table-hover align-middle" >
         
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
     </div> :
        !loading ? <div style={{display:'flex', justifyContent:'center'}}>No data available</div>: <div></div>
    }
   
        </>
    
  )
}
