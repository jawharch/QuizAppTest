import React, { useState } from 'react'
import './Auth.css'
import Stack from '@mui/material/Stack';
import { TextField } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { login } from '../apiCalls';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { CleanHands } from '@mui/icons-material';
import axios from 'axios';


const Auth = () => {
  const form=useForm(
    {
      defaultValues:
      {
        username:"",
        email:"",
        password:""
      },
      mode:"onChange"
    }
  )
  const {register,control,handleSubmit,formState,getValues}=form
  const {errors,isDirty,isValid}=formState
  const dispatch=useDispatch()
   const [action, setaction] = useState("Login")
   const [username, setusername] = useState("")
   const [email, setemail] = useState("")
   const [password, setpassword] = useState("")

  const handleLoginClick=(e)=>
   {
    e.preventDefault()
   
    login(dispatch,{username,password})

   }
   const  onSubmit=(data)=>
   {
    console.log('form submitted',data)
   }
   const handleSignUpClick=(e)=>
   {
    e.preventDefault()
   }
  
  return (
    <div className='containerAuth'>
      <div className='header'>
        <div className='text'>{action}</div>
        <div className="underline"></div>
      </div>
      <form  className='form'onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack  className='inputs' >
        <div className='input'>
          <PersonIcon className='img'></PersonIcon>


        <TextField 
            label="username"
            type="text" className='textfield'
            onChange={(e)=>setusername(e.target.value)} 
            {...register("username",{
              required:'username is required '
            })}
           
            />
            
            </div>
            <div className='error-container'>
    <p className='error'>{errors.username?.message}</p>
  </div>
            {action==="Sign Up"? (
              <>
               <div className='input'>
               <EmailIcon className='img'></EmailIcon>
     
     
             <TextField 
                 label="email"
                 type="email"  className='textfield'
                 {...register("email",
                 {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email format"
                  },
                  validate: {
                    notAdmin: (fieldValue) => {
                      return fieldValue !== "admin@gmail.com" || "Enter a different email address";
                    },
                    // emailAvailable: async (fieldValue) => {
                    //   const data = await axios.post('http://localhost:5001/user/email-check', fieldValue);
                    //   return data.length === 0 || "Email Already Exists";
                    // }
                  }
                }
                
                 )}
                 />
              </div>
              <div className='error-container'>
    <p className='error'>{errors.email?.message}</p>
  </div>
               </>
                 
            ):null}
       
        <div className='input'>
          <LockIcon className='img'></LockIcon>


        <TextField 
            label="password"
            type="password"  className='textfield'
            onChange={(e)=>setpassword(e.target.value)}
            {...register("password")}
            
            /></div>
            <div className='error-container'>
    <p className='error'>{errors.password?.message}</p>
  </div>
      

      </Stack>
      
      <button  onClick={action ==="Login"? handleLoginClick:handleSignUpClick} className='submitb' disabled={!isDirty ||  !isValid} >submit</button>
      </form>
      <DevTool control={control}/>
      <div className="forgotpassword">Lost Password? <span>click here</span></div>
      <div className="submit-container">
        <div className={action==="Login"? "submit gray":"submit"}>
         <button onClick={()=>setaction('Sign Up')}>Sign Up</button>
        </div>
        <div className={action==="Sign Up"? "submit gray":"submit"}>
          <button onClick={()=>setaction("Login")}>Login</button>
        </div>

      </div>
  
    </div>
  )
}

export default Auth
