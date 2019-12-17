import React,{useState} from 'react';
// import { connect } from "react-redux";
// import store from '../store';
// import { Container, Row, Col, Form, Button } from 'react-bootstrap' 
import { Field, reduxForm, SubmissionError } from 'redux-form'
import {config} from '../../config/config'
import account_logo from '../../images/account_logo.png';
import axios from 'axios';
interface fieldInterface {
    input: any;
    label: string;
    type: string;
    meta: {
        touched: boolean;
        error: string;
    };
}

const access_token = localStorage.getItem('admin_access_token');


const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))


const submit = (values: any,image:any) => {
     
  
    
  return sleep(1000).then(() => {
    values.image = image
   if (validateForm(values)) {
    var formData = new FormData();
   
    formData.append("image", image);
    formData.append("name", values.name);
    formData.append("type", "G");
    
    const headers = {
      headers: { 'content-type': 'multipart/form-data','access_token':access_token }
    }
    
   
     axios
      .post(`${config.apiUrl}/genres/addGenre`, formData,headers)
      .then(response => {
       console.log(response);
       window.location.href = `${config.appurl}/admin/playlists`; 
      })
      .then(json => {
       
       
      })
      .catch(error => {
        console.log(error);
        alert(`An Error Occured! ${error}`);
      
      });
    }
})
}
const validateForm= (data:any) => {
  console.log(data);
   let fields = data;
   let errors :any = [];
   let formIsValid = true;
   console.log(fields["image"].length)
   if (!fields["name"]) {
     formIsValid = false;
     throw new SubmissionError({ name: 'Enter Genre Name.', _error: 'Enter Genre Name' })
   
   }

  //  if (typeof fields["name"] !== "undefined") {
  //    if (!fields["name"].match(/^[a-zA-Z ]*$/)) {
  //      formIsValid = false;
  //    throw new SubmissionError({ name: 'Please enter alphabet characters only.', _error: 'Register failed!' })
  //    }
  //  }
   if (fields["image"].length==0) {
     console.log("dfdsfjdshfjdshfj")
    formIsValid = false;
    throw new SubmissionError({ image: 'Select an image.', _error: 'Select an image' })
  
  }

   return formIsValid;


 }

const renderField = ({ input, label, type, meta: { touched, error } }: fieldInterface) => (
  <div className="form-group">
      <label>{label}</label>
      
        <input {...input} placeholder={label} type={type} className="form-control" />
        {touched && error && <span style={{color:"red"}}>{error}</span>}
      
    </div>
  )
 
  const Playlist = (props: any) => {
    const { error, handleSubmit, pristine, reset, submitting } = props
      
    const [image, setimage] = useState([]);
    return (
      <div id="page-wrapper">
      <div className="user_table user-form">
           <div className="row">
           <div className="col-lg-12">
           <h3>Add Playlist</h3>
           <div className="user-form">
              <form onSubmit={handleSubmit((val: any) => submit(val,image))}>
              <div className="col-md-8">
              <Field
          name="name"
          type="text"
          component={renderField}
          label="Playlist Name"
          
        /></div>
        
          <div className="col-md-8">
               <input type='file' id="imageUpload" name ="img_file" accept=".png, .jpg, .jpeg" onChange={ (e:any) => setimage(e.target.files[0]) }  />
               {error && <strong style={{color:"red"}}>{error}</strong>}
               </div>
              
                <div className="col-md-8">
               
                <div className="accunt_btn text-center">
                <div className="col-md-4">
                <a className="btn" id="back_btn" href="javascript: history.go(-1)">Back</a>
                </div>
                <div className="col-md-4">
                <button type="submit" disabled={submitting} className="btn">Submit</button></div>
                  {/* <a href="profile.html" className="btn">LOGIN</a> */}
                </div>
                </div>
               
             
              </form>
              <p className="coypright_txt text-center">© 2019, All Rights Reserved.</p>
            </div>
          </div>
      </div>
      </div>
      </div>
    

       )
  }
  
  export default reduxForm({
    form: 'loginForm' // a unique identifier for this form
  })(Playlist)