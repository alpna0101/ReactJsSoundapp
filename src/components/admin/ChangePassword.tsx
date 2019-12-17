import React from 'react';
// import { connect } from "react-redux";
// import store from '../store';
// import { Container, Row, Col, Form, Button } from 'react-bootstrap' 
import { Field, reduxForm, SubmissionError } from 'redux-form'
import {config} from '../../config/config'
import account_logo from '../../images/account_logo.png';
import firebase from '../../firebase';
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

const submit = (values:any) => {
  return sleep(1000).then(() => {
  if (validateForm(values)) {
   
  
    let config1 = {
      headers: {
        'access_token':access_token,
        'Content-Type': 'application/json'
    }
    }
   
    axios.put(`${config.apiUrl}/admins/changeAdminPass`, {
        
      current_password: values.current_password,
      new_password: values.password
       
    }, config1)
    .then(function (response) {
      console.log(response.data);
      // 
      if(response.data.status==false){
        alert(response.data.message);
      }else{
        alert(response.data.message);
      
        logout();
       
      }
     
    })
  }

   
  })
}
const logout=()=>{
	axios
	.get(`${config.apiUrl}/admins/logoutAdmin`,  {headers: {
	  'access_token':access_token
	  }})
	.then(response => {
    localStorage.removeItem('admin_access_token');
    localStorage.removeItem('user_type');
	  localStorage.clear();
	  window.location.href = `${config.appurl}/admin/login`;
	})
	.then(json => {
	})


}
const validateForm= (data:any) => {
  
  let fields = data;
  let errors :any = [];
  let formIsValid = true;
  if (!fields["current_password"]) {
    formIsValid = false;
    throw new SubmissionError({ current_password: 'Please enter your current password.' })
  } else if (!fields["password"]) {
    formIsValid = false;
    throw new SubmissionError({ password: 'Please enter your password.' })
  } else if (fields["password"].trim().length==0) {
    throw new SubmissionError({ password: 'Please enter a valid password.' })
  }else if (fields["password"].length < 6) {
    throw new SubmissionError({ password: 'Password should have minimum 6 character.' })
  }

 if (!fields["cpassword"]) {
    formIsValid = false;
    throw new SubmissionError({ cpassword: 'Please Re_enter your password.', _error: 'failed!' })
   
  }
  if(fields["cpassword"] != fields["password"]){
    throw new SubmissionError({ cpassword: 'Your Confirm Password do not match with password.', _error: 'failed!' })
  }


  return formIsValid;


}
const renderField = ({ input, label, type, meta: { touched, error } }: fieldInterface) => (
  <div className="form-group">
      <label>{label}</label>
      
        <input {...input} placeholder={label} type={type} className="form-control" />
        {touched && error && <span className="error">{error}</span>}
      
    </div>
  )
 
  const AdminLogin = (props: any) => {
    const { error, handleSubmit, pristine, reset, submitting } = props
    return (
      <div id="page-wrapper">
      <div className="user_table user-form">
      <div className="row">
      <div className="col-lg-12">
      <h3>Change Password</h3>
           <div className="user-form">
      <form onSubmit={handleSubmit(submit)}>
        <div className="inner_form">
          <div className="logo_img text-center">
          {/* <a href="/"><img src={account_logo}></img></a> */}
            
          </div>
          <div className="user-form">
          <Field name="current_password"  type="password" component={renderField}  label="Current Password" />
          <Field name="password"  type="password" component={renderField}  label="New Password" />
          <Field name="cpassword" type="password" component={renderField} label="Confirm Password" />
            {/* {error && <strong>{error}</strong>} */}
            <div className="accunt_btn text-center">
            <button type="submit" disabled={submitting} className="btn">Submit</button>
            </div>
            </div>
            </div>
        </form>
        </div>
        </div>
        </div>
        </div>
        </div>

  )
  }
  
  export default reduxForm({
    form: 'loginForm' // a unique identifier for this form
  })(AdminLogin)