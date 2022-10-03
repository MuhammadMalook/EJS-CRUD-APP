import React from 'react'
import { Formik, Form } from 'formik'
import TextField from './TextField'
import * as Yup from 'yup';
import image from '../assets/logo.png';
import {Link} from 'react-router-dom'
import '../assets/Login.css'
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate  = useNavigate()

  const validate = Yup.object({
   
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 charaters')
      .required('Password is required')
  })

  return (
    <Formik
    initialValues={{
      email: '',
      password: '',
    }}
    validationSchema={validate}
    onSubmit={async(values) => {
      const body = {email:values.email, password:values.password }
      console.log(body)
      const response = await fetch('/login', {
        method:"POST",
        headers:{
          "Content-type":"application/json"
        },
        body: JSON.stringify(body)
      })
      const jsonData = await response.json()
      if(jsonData.success)
      {
        alert("loged in successfully")
        navigate('/register')
        localStorage.setItem("token", JSON.stringify(jsonData.token))
        console.log(localStorage.getItem("token"))
      }
      else{
        alert("error occured")
      }
    }}
  >
    {formik => (
      <div className="container-login mt-3">
      <div className="row ">
        <div className="col-md-7 my-auto">
          <div className='col-md-8'>
            <img className="img-fluid w-75 h-50 ms-5" src={image} alt=""/>
          </div>
        </div>
        <div className="col-md-5">
          <div>
            <h1 className="my-4 font-weight-bold .display-4">Log in</h1>
            <Form>
              
              <TextField label="Email" name="email" type="email" />
              <TextField label="password" name="password" type="password" />
              <button className="btn btn-dark mt-3" type="submit">Login</button>
              <button className="btn btn-danger mt-3" type="reset" style={{marginLeft:20}}>Reset</button>
            </Form>
            <div style={{marginTop:"15px"}}>don't have an account? <Link to="/register">sign up</Link></div>
          </div>
        </div>
      </div>
    </div>
      
    )}
  </Formik>
  )
}

export default Login