import React from 'react';
// import { connect } from "react-redux";
// import store from '../store';
// import { Container, Row, Col, Form, Button } from 'react-bootstrap' 
import { Field, reduxForm, SubmissionError } from 'redux-form'
import {config} from '../config/config'
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
    console.log(values)
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
    axios.put(`${config.apiUrl}/users/forgotPassword`, {
        password:values.password,
    }, config1)
    .then(function (response) {
        alert(response.data.message);
        console.log(response);
        window.location.href = `${config.appurl}/login`; 
    //   localStorage.setItem('access_token', response.data.access_token);
    //     window.location.href = 'http://localhost:3000'; 
    })
  } 
  })

}

const validateForm= (data:any) => {
       
  let fields = data;
  let errors :any = [];
  let formIsValid = true;

 if (!fields["password"]) {
    formIsValid = false;
    throw new SubmissionError({ password: 'Please enter your password.' })
  } else if (fields["password"].trim().length==0) {
    throw new SubmissionError({ password: 'Please enter a valid password.' })
  }else if (fields["password"].length < 6) {
    throw new SubmissionError({ password: 'Password should have minimum 6 character.' })
  }

  if (!fields["confirm_password"]) {
    formIsValid = false;
    throw new SubmissionError({ confirm_password: 'Please enter your confirm password.' })
    // errors["email"] = "*Please enter your email-ID.";
  }
  if (fields["confirm_password"]) {
       
        
       
    if(fields["confirm_password"] != fields["password"]){
      // openModal(false)
      formIsValid = false;
      throw new SubmissionError({ confirm_password: 'Your Confirm Password do not match with password.'})
    }
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

  const Forget = (props: any) => {
    const { error, handleSubmit, pristine, reset, submitting } = props
    return (


      <section className="main_section forgt">
	<div className="container">
		<div className="inner_form">
			<div className="logo_img text-center">
        <a href = "/">
				<img src= {require("../images/account_logo.png")}/>
        </a>
				<h5>Change Password</h5>
			</div>
			<div className="form_inner">
      <form onSubmit={handleSubmit(submit)}>
				<div className="forgt_icon text-center">
					<img src={require("../images/forgot_icon.png")}/>
          
					{/* <h5>Please enter your registered email address below
					and we will send your reset password link.</h5> */}
				</div>
        <Field
          name="password"
          type="text"
          component={renderField}
          label="Password"
        />
          <Field
          name="confirm_password"
          type="text"
          component={renderField}
          label="Confirm Password"
        />
          {error && <strong>{error}</strong>}
				<div className="accunt_btn text-center">
        <button type="submit" disabled={submitting} className="btn">
          Change Password
          </button>
				</div>
				<div className="bottom_links text-center">
       
					<ul>
						<li><a href="/login"> Login<img src={require("../images/right_arrow.png")}/></a></li>
					</ul>
				</div>



        </form>
			</div>
     
			<p className="coypright_txt text-center">© 2019, All Rights Reserved.</p>
     
		</div>
    
	</div>
</section>

  
    )
  }
  
  export default reduxForm({
    form: 'forgetForm' // a unique identifier for this form
  })(Forget)