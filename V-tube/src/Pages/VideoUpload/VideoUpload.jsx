import React, { useEffect, useState } from "react";
import "./VideoUpload.css";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
const BackendUrl = import.meta.env.VITE_BACKEND_URL;
const cloudKey = import.meta.env.VITE_CLOUD_KEY;
const cloudUrl = import.meta.env.VITE_CLOUD_URL;
const VideoUpload = () => {
  const [inputField, setInputField] = useState({
    "title": "",
    "description": "",
    "video": "",
    "thumbnail": "",
    "videoType": "",
  });
  const [loader,setLoader] = useState(false);
  const navigate = useNavigate();
  // console.log(inputField);

//-----------------------------------------------------------------------------------------

  // handel puting value in correct inputfield name
  const handleOnChangeInput = (event, name) => {
    setInputField({
      ...inputField,
      [name]: event.target.value,
    });
  };
//------------------------------------------------------------------------------------------
 
  const uploadImage = async (e, type) => {
    setLoader(true);
    const files = e.target.files;
    // console.log(files);
    const data = new FormData();
    data.append("file", files[0]);
    // V-tube
    data.append("upload_preset", "V-tube");
    const resourceType = type === "video" ? "video" : "image";
    try {
      
      
      const response = await axios.post(
        `${cloudUrl}/v1_1/${cloudKey}/${type}/upload`,
        data
      );
      // console.log(response);
      const Url = response.data.secure_url;
      setLoader(false);
      let val = type === "image" ? "thumbnail" : "videoLink";
      setInputField({
        ...inputField,
        [val]: Url,
      });
    } catch (err) {
      setLoader(false)
      console.log(err);
    }
  };
  // console.log(inputField);

  useEffect(()=>{
    let isLogin = localStorage.getItem("userId");
    if(isLogin== null){
        navigate('/');
    }
  },[]);

  const handleSubmitFunc = async()=>{
    setLoader(true);
      await axios.post(`${BackendUrl}/api/video`,inputField,{withCredentials:true}).then((resp)=>{
        // console.log(resp);
        setLoader(false)
        navigate('/');
      }).catch(err=>{
        console.log(err);
      })
  }

  return (
    <div className="videoUpload">
      <div className="uploadBox">
        <div className="uploadVideotitle">
          <SmartDisplayIcon sx={{ color: "red", fontSize: "54px" }} />
          Upload Video
        </div>
        <div className="uploadForm">
          <input
            type="text"
            placeholder="Title of Video"
            value={inputField.title}
            onChange={(e) => {
              handleOnChangeInput(e, "title");
            }}
            className="uploadFormInputs"
          />
          <input
            type="text"
            placeholder="Description"
            value={inputField.description}
            onChange={(e) => {
              handleOnChangeInput(e, "description");
            }}
            className="uploadFormInputs"
          />
          <input
            type="text"
            placeholder="Category"
            value={inputField.videoType}
            onChange={(e) => {
              handleOnChangeInput(e, "videoType");
            }}
            className="uploadFormInputs"
          />
          <div className="ThumbnailInput">
            Thumbnail:{" "}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => uploadImage(e, "image")}
            />{" "}
          </div>
          <div className="ThumbnailInput">
            Video:{" "}
            <input
              type="file"
              accept="video/*"
              onChange={(e) => {
                uploadImage(e, "video");
              }}
            />
          </div>
           {
             loader && <Box sx={{display:'flex' }}>
                      <CircularProgress/>
                    </Box>
                    
          }
        </div>
        {/* <div>
         <div>Thumbnail <input type="file" accept='image/*' /> </div>
          <div>Video <input type="file" accept='video/mp4,video/webm,video/*' /></div>

        </div> */}

       

        <div className="uploadBtns">
          <div className="uploadBtn-form" onClick={handleSubmitFunc} >Upload</div>
          <Link to={"/"} className="uploadBtn-form">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VideoUpload;
