import React, { useEffect, useState } from 'react'
import { Formik, Form,ErrorMessage } from 'formik'
import TextField from './TextField'
import * as Yup from 'yup';

export default function AddUser() {

  const [imageUrl, setImageUrl] = useState()

  const validate = Yup.object({
    fullname: Yup.string()
      .max(30, 'Must be 30 characters or less')
      .required('Required'),
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    phone: Yup.string()
      .min(11 , 'phone must be at least 11 charaters')
      .required('phone is required'),
    about: Yup.string()
      .min(5,'about is invalid')
      .required('about is required'),
   
  })


  return (
    <Formik
    initialValues={{
      fullname: '',
      email: '',
      phone: '',
      about: '',

    }}
    validationSchema={validate}
    onSubmit={async(values) => {
      let data = new FormData()
      data.append("fullname", values.fullname)
      data.append("email", values.email)
      data.append("phone", values.phone)
      data.append("about", values.about)
      data.append("admin_email", "malook@gmail.com")
      data.append("imageUrl", imageUrl)


      console.log( data.entries)
      //const body = {fullname:values.fullname, email:values.email, phone:values.phone, about:values.about,imageUrl, admin_email:"malook@gmail.com" }
       
      const response = await fetch('/addUser', {
        method:"POST",
        headers:{
          // 'Content-type': 'multipart/form-data',
        },
        body: data
      })
      const jsonData = await response.json()
      if(jsonData.success)
      {
        alert("Added successfully")
        navigate('/home')
      }
      else{
        alert("error occured ", jsonData.msg)
      }
    }}
  >
    {formik => (
      <div className="container mt-3">
      <div className="row">
        <div className="col-md-12">
            <div>
                <h1 className="my-4 font-weight-bold .display-4">Sign Up</h1>
             
                <Form>
                  <TextField label="Full Name" name="fullname" type="text" />    
                  <TextField label="Email" name="email" type="email" />
                  <TextField label="Phone" name="phone" type="phone" />
                  <TextField label="About" name="about" type="text" />
                  <div className="mb-2">
              <label >Image</label>
              <input
                className={'form-control shadow-none'}
                // name = "imageUrl"
                type={'file'}
                autoComplete="off"
                onChange={(event)=>setImageUrl(event.target.files[0])}
              />
              <ErrorMessage component="div" name={"error"} className="error" />
            </div>
                  <button className="btn btn-dark mt-3" type="submit">ADD PERSON</button>
                  <button className="btn btn-danger mt-3" type="reset" style={{marginLeft:20}}>Reset</button>   
                </Form>
                
  
              
            </div>
        </div>
      </div>
    </div>
      
    )}
  </Formik>
  )
}
