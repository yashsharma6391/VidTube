import React, { useState } from "react";
import "./Login.css";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
const BackendUrl = import.meta.env.VITE_BACKEND_URL;





const Login = ({setLoginModel}) => {
  const [loginField, setLoginField] = useState({"userName":"","password":""});
  // console.log(loginField);
  const [loader,setLoader] = useState(false);

  const handleOnChangeInput= (event,name)=>{
      setLoginField({
        ...loginField,[name]:event.target.value
      })
  }
  const handleLogin = async()=>{
    setLoader(true);
    axios.post(`${BackendUrl}/auth/login`,loginField,{withCredentials:true}).then((res)=>{
      // console.log(res);
      setLoader(false);
      localStorage.setItem("token",res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("userId",res.data.user._id);
      localStorage.setItem("userProfilePic",res.data.user.profilePic);
      window.location.reload();


    }).catch(err=>{
      toast.error("Invalid Credentials");
      console.log(err);
      setLoader(false);

    })
  }
  const handleKeydown = (e) =>{
    if(e.key ==='Enter'){
      e.preventDefault();
      handleLogin();
    }
  }
  return (
    <div className="login">
      <div className="login_card">
        <div className="titleCard_login">
          <SmartDisplayIcon
            sx={{ fontSize: "54px", color: "red" }}
            className="login_youtubeImage"
          />
          Login
        </div>
        <div className="loginCredentials">
          <div className="userNameLogin">
            <input
              type="text"
              value={loginField.userName}
              onChange={(e)=>handleOnChangeInput(e,"userName")}
              placeholder="UserName:"
              className="userNameLoginUserName"
              onKeyDown={handleKeydown}
              

            />
          </div>
           <div className="userNameLogin">
            <input
              type="password"
              value={loginField.password}
              onChange={(e)=>handleOnChangeInput(e,"password")}

              placeholder="Password:"
              className="userNameLoginUserName"
              onKeyDown={handleKeydown}
            />
          </div>
        </div>
        <div className="login_buttons">
            <div className="login_btn" onClick={handleLogin} >Login</div>
            <Link to={'/signup/'} onClick={()=>setLoginModel()} className="login_btn">SignUp</Link>
            <div className="login_btn" onClick={()=>setLoginModel()}>Cancel</div>
        </div>
          {loader&&<Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>}
      </div>
      <ToastContainer className="Toastify__toast-container"/>
    </div>
  );
};

export default Login;
