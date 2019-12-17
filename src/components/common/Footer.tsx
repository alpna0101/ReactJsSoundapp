import React, { useState,useEffect,useContext } from 'react';
// import { Col,Row } from 'react-bootstrap'
// import { Field, reduxForm, SubmissionError } from 'redux-form'
// import axios from 'axios';
import footer_logo from '../../images/footer_logo.png';

import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';
import {config} from '../../config/config'

import $ from "jquery";
const Footer = () => {
    const [email, setemail] = useState([]);
    const access_token = localStorage.getItem('access_token');
    const handleChangeemail =(e:any)=>{
        setemail(e.target.value)
     }
    //  const userInfo: any = useContext(AuthContext);
     
     const sendnewsletter =(email:any)=>{
        // var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        // if (!pattern.test(email)) {
         
        //   alert("Please enter a valid email");
        //   return false;
        
        // }


        let config1 = {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'devicetype':'A',
                'version' : '1.0'
            }
          }
          axios.post(`${config.apiUrl}/users/contact`, {
              email:email,
           }, config1).then(function (response) {
            if(response.data.status==false){
              alert(response.data.message);
             
            }else{
                alert(response.data.message);
            window.location.href = `${config.appurl}`;
           
            
             }
          })
       
     }
     useEffect(() => {
     
        $(".infoa").css("color","#337ab7");
        $(".infoa").css("float","none");
   
        }, []);

  
    return (
        <div>
        <div className="modal-backdrop fade in" style={{display:"none"}} id="mm"></div>
        <section className="footer_sctn" id="Contact_us">
        <div className="container">
            <div className="col-md-12">
            {
     (() => {
        if (!access_token) {
               return (<div className="top_mail text-center">
                    <h4>If you have any questions about licensing, membership, or want to submit tracks to Sounds Sphere, please contact us at:</h4>
                    <h3><a href="mailto:info@soundssphere.com" className="infoa">info@soundssphere.com</a></h3>
                    <h5>Join Our Newsletter</h5>
                    <div className="form-group">
                        <div className="search_bar">
                        <input type="email"  placeholder="Enter Email Address"  value={email}    onChange={handleChangeemail}  id="email" />
                            <button className="btn" onClick={sendnewsletter}>Submit</button>
                        </div>
                    </div>
                </div>)
        }
                })()
            }
                <div className="bottom_link text-center">
                <a href="/"><img src={footer_logo} alt="Footer Logo"/></a>
                    <ul>
                    <li><a href="/about">About Us</a></li>
                            <li><a href="/faq">FAQ</a></li>
                            <li><a href = "http://18.188.75.114:3000/document/liscense.pdf" target = "_blank">License Agreement</a></li>
                    </ul>
                    <ul>
                        <li><a href=""><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                        <li><a href=""><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
                        <li><a href=""><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
                        <li><a href=""><i className="fa fa-youtube-play" aria-hidden="true"></i></a></li>
                    </ul>
                    <p className="text-center">© 2019, All Rights Reserved.</p>
                </div>
            </div>
        </div>
</section>
  </div>
  
    )
}

export default Footer