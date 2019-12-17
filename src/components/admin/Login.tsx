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


const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const submit = (values:any) => {
  return sleep(1000).then(() => {
  if (validateForm(values)) {
    let config1 = {
      headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
          'devicetype':'A',
          'version' : '1.0'
      }
    }
    axios.post(`${config.apiUrl}/admins/admin`, {
        email:values.email,
        password: values.password
       
    }, config1)
    .then(function (response) {
      if(response.data.status==false){
        alert(response.data.message);
      }else{
        console.log(response.data)
        localStorage.setItem('verify_token', response.data.verify_token);
        // localStorage.setItem('user_type', "admin");
     
        window.location.href = `${config.appurl}/admin/two-factor-authentication`; 
        if(response.data.user_type=="User"){
          // window.location.href = `${config.appurl}`; 
        }else{
          // window.location.href = `${config.appurl}/admin`; 
        }
       
        
        
      }
     
    })
  }

   
  })
}
const validateForm= (data:any) => {
       
  let fields = data;
  let errors :any = [];
  let formIsValid = true;

 if (!fields["email"]) {
    formIsValid = false;
    throw new SubmissionError({ email: 'Please enter your email-ID.', _error: 'Register failed!' })
   }
 if (!fields["password"]) {
    formIsValid = false;
   throw new SubmissionError({ password: 'Please enter your password.', _error: 'Register failed!' })
  }



  return formIsValid;


}
const renderField = ({ input, label, type, meta: { touched, error } }: fieldInterface) => (
  <div className="form-group">
      <label>{label}</label>
      
        <input {...input} placeholder={label} type={type} className="form-control" />
        {touched && error && <span>{error}</span>}
      
    </div>
  )
 
  const AdminLogin = (props: any) => {
    const { error, handleSubmit, pristine, reset, submitting } = props
    return (
   <section className="main_section admin_login">
      <div className="container">
      <form onSubmit={handleSubmit(submit)}>
        <div className="inner_form">
          <div className="logo_img text-center">
          <a href="/"><img src={account_logo}></img></a>
            
          </div>
          <div className="form_inner">
          <Field name="email"  type="text" component={renderField}  label="Email" />
          <Field name="password" type="password" component={renderField} label="Password" />
            {error && <strong>{error}</strong>}
            <div className="accunt_btn text-center">
            <button type="submit" disabled={submitting} className="btn">LOGIN</button>
            </div>
            </div>
            </div>
        </form>
        </div>
   </section>
  )
  }
  
  export default reduxForm({
    form: 'loginForm' // a unique identifier for this form
  })(AdminLogin)