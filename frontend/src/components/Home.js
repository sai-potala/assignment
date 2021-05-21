import React from 'react'
import {useState,useEffect} from 'react'
import axios from 'axios'
import { Card, Button } from "react-bootstrap";

function Home(props) {
    const [userInfo, setuserInfo] = useState(
      JSON.parse(sessionStorage.getItem("userInfo"))
    );
    const[data,setData] = useState("")
    
    const cardDisplay = () =>{
        if(data){
          console.log("came here ",data)
           return data.map((item) => {
             return (
               <div className={`box`}>
                 <Card style={{ width: "18rem" }}>
                   <Card.Img
                     variant="top"
                     src={item.imgLink}
                     style={{ height: "200px" }}
                   />
                   <Card.Body>
                     <Card.Title>{item.title}</Card.Title>
                     <Card.Text>{item.text}</Card.Text>
                     <Button variant="dark">Go somewhere</Button>
                   </Card.Body>
                 </Card>
               </div>
             );
           });
        }
    }  

    useEffect(()=>{

        async function apiCall(){
          const { data } = await axios.get(
            `http://localhost:5000/card/all/${userInfo._id}`
          );
          setData(data)
          
        }
        
        apiCall()

    },[])
    return (
      <>
        <div className="main-container">
          <div className="box-container">{cardDisplay()}</div>
        </div>
      </>
    );
}

export default Home
