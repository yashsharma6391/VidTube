import React, { useState } from "react";
import "./SignUp.css";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import { Link ,useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
const BackendUrl = import.meta.env.VITE_BACKEND_URL;
const cloudKey = import.meta.env.VITE_CLOUD_KEY;
const cloudUrl = import.meta.env.VITE_CLOUD_URL;



const SignUp = () => {
  const [uploadedImageUrl, setUploadedImageUrl] = useState(
    "https://th.bing.com/th/id/OIP.afscx61wTsHlXo6T9vo1SwHaHa?rs=1&pid=ImgDetMain"
  );
  const [signUpField, setSignUpField] = useState({
    "channelName": "",
    "userName": "",
    "password": "",
    "about": "",
    "profilePic": uploadedImageUrl,
  });
  // console.log(signUpField)
 
  const [progressBar, setProgressBar] = useState(false);            //for progress bar conditional rendering
  
  const Navigate = useNavigate();

  const handleInputField = (event, name) => {
    setSignUpField({
      ...signUpField,
      [name]: event.target.value,
    });
  };
  // console.log(signUpField);
  const uploadImage = async (e) => {
    const files = e.target.files;
    // console.log(files);
    const data = new FormData();
    data.append("file", files[0]);
    // V-tube
    data.append("upload_preset", "V-tube");
    try {
      setProgressBar(true);
      // cloudname = "dj6wtbjqi"
      const response = await axios.post(
        `${cloudUrl}/v1_1/${cloudKey}/image/upload`,
        data
      );
      setProgressBar(false);
      // console.log(response);
      const imageUrl = response.data.url;
      setUploadedImageUrl(imageUrl);
      setSignUpField({
        ...signUpField,
        profilePic: imageUrl,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const handleSignup = async () => {
    setProgressBar(true);
    axios
      .post(`${BackendUrl}/auth/signup`, signUpField)
      .then((res) => {
        toast.success(res.data.message)
        setProgressBar(false)
        Navigate('/')
        // console.log(res);
      })
      .catch((err) => {
        setProgressBar(false);
        // console.log(err);
        toast.error(err);
      });
  };
  const handleKeyDown = (e)=>{
    if(e.key === 'Enter'){
      e.preventDefault();
      handleSignup();
    }
  }

  return (
    <div className="SignUp">
      <div className="signup_card">
        <div className="signup_title">
          <SmartDisplayIcon
            sx={{ fontSize: "54px", color: "red" }}
            className="login_youtubeImage"
          />
          SignUp
        </div>
        <div className="signupInputs">
          <input
            type="text"
            value={signUpField.channelName}
            onChange={(e) => {
              handleInputField(e, "channelName");
            }}
            className="signup_inputs_inp"
            placeholder="Channel Name"
            onKeyDown={handleKeyDown}
          />
          <input
            type="text"
            value={signUpField.userName}
            onChange={(e) => {
              handleInputField(e, "userName");
            }}
            className="signup_inputs_inp"
            placeholder="User Name"
            onKeyDown={handleKeyDown}
          />
          <input
            type="password"
            value={signUpField.password}
            onChange={(e) => {
              handleInputField(e, "password");
            }}
            className="signup_inputs_inp"
            placeholder="Password"
            onKeyDown={handleKeyDown}
          />
          <input
            type="text"
            value={signUpField.about}
            onChange={(e) => {
              handleInputField(e, "about");
            }}
            className="signup_inputs_inp"
            placeholder="About your Channel"
            onKeyDown={handleKeyDown}
          />
          <div className="image_upload_signup">
            <div className="img_choose_btn">
              <input type="file" onChange={(e) => uploadImage(e)} onKeyDown={handleKeyDown}/>
            </div>
            <div className="image_upload_signup_div">
              <img
                className="image_default_signup"
                src={uploadedImageUrl}
                alt=""
              />
            </div>
          </div>
          <div className="signUpBtns">
            <div className="signUpBtn" onClick={handleSignup}>
              SignUp
            </div>
            <Link to={"/"} className="signUpBtn">
              Hompage
            </Link>
          </div>
          {progressBar&& <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
