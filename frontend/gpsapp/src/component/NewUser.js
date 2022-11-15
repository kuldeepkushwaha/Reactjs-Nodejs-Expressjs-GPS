import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import '../css/LoginRegister.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
export default function NewUser() {
  const [Fullname,setFullName]=useState("");
  const [Email,setEmail]=useState("");
  const [Password,setPassword]=useState("");
  const [CPassword,setCPassword]=useState("");
  const [m,setMessage]=useState("");
  const navigate=useNavigate();
  const register=async(e)=>{
    e.preventDefault();
   try{ 
    await axios.post('http://localhost:5000/users',{
      name:Fullname,
      email:Email,
      password:Password,
      confPassword:CPassword
    });
    alert("Successfully Register");
    navigate("../login")
  }
  catch(error){
    if(error.response){
      setMessage(error.response.data.msg);
      console.log(error.response.data.msg);
    }
  }
  }
    return (
      <div className="container-border">
      <form className='form' onSubmit={register}>
      <h5 className="title-label m-2">Register</h5>
       <p className='label label-danger text-danger'>{m}</p>
          <input type="text" value={Fullname} onChange={(e)=>setFullName(e.target.value)} placeholder="Full Name" />
          <input type="email" value={Email} onChange={(e)=>setEmail(e.target.value)} id="exampleInputEmail1" placeholder="Email" />
          <input type="password" value={Password} onChange={(e)=>setPassword(e.target.value)} id="exampleInputPassword1" placeholder="Password" />
          <input type="password" value={CPassword} onChange={(e)=>setCPassword(e.target.value)} id="exampleInputPassword1" placeholder="Confirm Password" />
          <label className="terms-services">By signing up, you agree to the Terms of Service and Privacy Policy, including the use of cookies. Others will be able to find you by email or phone number when provided with privacy options.</label>
          <button type="submit" className="btn-login m-2">Sign Up</button>
        <Link type="button" to={"/login"}className=" btn btn-link btn-newuser m-2">Login?</Link>
      </form>

    
  </div>

    );
}   