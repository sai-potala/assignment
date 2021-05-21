import React from 'react'
import { useState, useEffect } from "react";
import axios from 'axios' ;
function CardCreator(props) {
  const token = JSON.parse(sessionStorage.getItem("token"));
     const [userInfo, setUserinfo] = useState(
       JSON.parse(sessionStorage.getItem("userInfo"))
     );
    const [image, setImage] = useState("");
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [cardInfo, setcardInfo] = useState("");
    const [errorMessage, setErrormessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const[loadingUpload,setLoadingUpload] = useState(false)

    const submitHandler = async(e) => {
      console.log("came here to sbumit handler")
      e.preventDefault(); 
        try {
          console.log("came above post");
          const { data } = await axios.post(
            `http://localhost:5000/card/create/${cardInfo._id}`,
            { title, text, image },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setSuccessMessage("Data Updated Successfully")
        } catch (err) {      
          console.log("err is",err.response)      
                setErrormessage(err.response.data.message)
              }
      } 
    const uploadFileHandler = async (e) => {
      const file = e.target.files[0];
      const bodyFormData = new FormData();
      bodyFormData.append("image", file);
      setLoadingUpload(true);
      try {
        const { data } = await axios.post(
          `http://localhost:5000/card/upload/${userInfo._id}`,
          bodyFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setImage(`/images${data.path}`);
        setcardInfo(data.cardInfo)
        setLoadingUpload(false);
      } catch (error) {
        setErrormessage(error.response.data.message);
        setLoadingUpload(false);
      }
    };
    return (
      <form className="form-dashboard" onSubmit={submitHandler}>
        {loadingUpload ? (
          <div>
            <img src="/images/loader.gif" alt="" />
          </div>
        ) : errorMessage ? (
          <div>
            <h3 className="error-message">{errorMessage}</h3>
          </div>
        ) : successMessage ? (
          <div>
            
            <h3 className="success-message">{successMessage}</h3>
          </div>
        ) : (
          <></>
        )}

        <div className="form-image">
          {image ? (
            // eslint-disable-next-line jsx-a11y/img-redundant-alt
            <img
              src={image}
              alt="no image uploaded"
              style={{ height: "200px" }}
            />
          ) : (
            <h4>No image Uploaded</h4>
          )}
        </div>
        <div>
          <label htmlFor="name">Title</label>
          <input
            type="text"
            id="name"
            placeholder="Enter name"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="text">Enter Card Text</label>
          <input
            type="text"
            id="text"
            placeholder="Enter Card Text"
            required
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="imageFile">Image File</label>
          <input
            type="file"
            id="imageFile"
            label="Choose Image"
            onChange={uploadFileHandler}
          />
        </div>
        <div style={{ margin: "10px" }}>
          <button className="small" type="submit">
            Update
          </button>
        </div>
      </form>
    );
}

export default CardCreator
