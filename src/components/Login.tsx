import React from 'react';
// import { connect } from "react-redux";
// import store from '../store';
import {  Button } from 'react-bootstrap' 
import { Field, reduxForm, SubmissionError } from 'redux-form'
import {config} from '../config/config'
import account_logo from '../images/account_logo.png';
import axios from 'axios';
import $ from "jquery";
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
  if (validateForm(values)) {
    $(".my_loader").css('display','block');
  return sleep(1000).then(() => {
 
  
    let config1 = {
      headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
          'devicetype':'A',
          'version' : '1.0'
      }
    }
    axios.post(`${config.apiUrl}/users/login`, {
        email:values.email,
        password: values.password
       
    }, config1).then(function (response) {
      if(response.data.status==false){
        alert(response.data.message);
        $(".my_loader").css('display','none');
      }else{
       
        localStorage.setItem('user_type', "user");
        localStorage.setItem('access_token', response.data.access_token);
        if(response.data.count==1){
          localStorage.setItem('login_count', response.data.count);
        }
      const access_token = localStorage.getItem('access_token');
    
      window.location.href = `${config.appurl}`;
        // if(response.data.verified_status==true){
        //   window.location.href = `${config.appurl}`; 
        // }else{
        //   window.location.href = `${config.appurl}/purchase`; 
        // }
      
       }
    })
 

   
  })
}
}
const validateForm= (data:any) => {
       
  let fields = data;
  let errors :any = [];
  let formIsValid = true;

 if (!fields["email"]) {
    formIsValid = false;
    throw new SubmissionError({ email: 'Please enter your email-ID.', _error: 'Register failed!' })
    // errors["email"] = "*Please enter your email-ID.";
  }
  if (typeof fields["email"] !== "undefined") {
    //regular expression for email validation
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    if (!pattern.test(fields["email"])) {
      formIsValid = false;
      
      throw new SubmissionError({ email: 'Please enter valid email-ID.', _error: 'Register failed!' })
    }
  }
  
  if (!fields["password"]) {
    formIsValid = false;
    // errors["password"] = "*Please enter your password.";
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
 
  const Login = (props: any) => {
    const { error, handleSubmit, pristine, reset, submitting } = props
    return (
     <section className="main_section">
          <div className="container">
            <div className="inner_form">
              <div className="logo_img text-center">
              <a href="/"><img src={account_logo}></img></a>
                <h5>Login into your Sounds Sphere Account</h5>
              </div>
              <form onSubmit={handleSubmit(submit)}>
              <div className="form_inner">
              <Field
                  name="email"
                  type="text"
                  component={renderField}
                label="Email"
                />
                <Field
                  name="password"
                  type="password"
                  component={renderField}
                  label="Password"
                />
                {error && <strong>{error}</strong>}
                <div className="accunt_btn text-center">
                <button type="submit" disabled={submitting} className="btn">LOGIN</button>
                  {/* <a href="profile.html" className="btn">LOGIN</a> */}
                </div>
                <div className="bottom_links">
                  <ul>
                    <li><a href = "/forgot">Forgot Password?</a></li>
                    <li><a href="/register"> Sign Up<i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i></a></li>
                  </ul>
                </div>
              </div>
              </form>
              <p className="coypright_txt text-center">© 2019, All Rights Reserved.</p>
            </div>
          </div>
          <div className="my_loader">
          <div className="loading_img">
         <div className="loader_txt"> <img src={require("../images/loading_img.gif")}/>
           <h3>Loading....</h3>
          </div>
      </div>
      <div className="loader_overly"></div>
      </div>
      </section>
       )
  }
  
  export default reduxForm({
    form: 'loginForm' // a unique identifier for this form
  })(Login)