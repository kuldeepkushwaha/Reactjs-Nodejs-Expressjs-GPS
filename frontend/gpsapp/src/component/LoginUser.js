import React from 'react'
import '../css/LoginRegister.css'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { LoginUser, reset } from '../features/authSlice';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState("");
  const [eye, setEye] = useState("fas fa-eye pass-eye");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (user || isSuccess) {
      navigate("/gpssummary");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);
  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ email, password }));

  }
  const togglePasswordVisiblity = (e) => {
   setEye(passwordShown ? "fas fa-eye pass-eye" : "fas fa-eye-slash pass-eye");
    setPasswordShown(passwordShown ? false : true);
  };

 

  return (

    <div className="container-border">
      <form onSubmit={Auth} className='form'>
        <h5 className="title-label m-2">Login</h5>
        {isError && <p className='label label-danger text-danger'>{message}</p>}
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="exampleInputEmail1" placeholder="Email" />

        <div className="pass-wrapper">
        <input 
       type={passwordShown ? "text" : "password"}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password" />
          
        <i className={eye} onClick={togglePasswordVisiblity} aria-hidden="true"/>
         </div>
        <label className="reset-password" onClick={(e)=>alert("Dummy Project (Email verification reset unavailable.)")}>Forgot Password</label>
        <button type="submit" className="btn-login m-2">{isLoading ? 'Loding...' : 'Login'}</button>
        <Link type="button" to={"/signup"} className=" btn btn-link btn-newuser m-2">New user?</Link>
      </form>


    </div>
  );
}