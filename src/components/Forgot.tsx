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


    if (validateForm(values)) {
      $(".my_loader").css('display','block');
   
    axios.put(`${config.apiUrl}/users/forgotPassword`, {
        email:values.email,
    }).then(function (response) {
     
      if(response.data.status==false){
        $(".my_loader").css('display','none');
        alert(response.data.message);
        }else{
        alert(response.data.message);
        // $("#myModalplan").removeClass('in')
        // $("#myModalplan").css("display","none");
        //  $(".modal-backdrop").css("display","none");
         window.location.href = `${config.appurl}/login`; 
         }
      },(error) => { console.log(error.data) })
  } 
 

}

const validateForm= (data:any) => {
       
  let fields = data;
  let errors :any = [];
  let formIsValid = true;

 if (!fields["email"]) {
    formIsValid = false;
    throw new SubmissionError({ email: 'Please enter your email-ID.' })
    // errors["email"] = "*Please enter your email-ID.";
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
				<h5>Forgot Password</h5>
			</div>
			<div className="form_inner">
      <form onSubmit={handleSubmit(submit)}>
				<div className="forgt_icon text-center">
					<img src={require("../images/forgot_icon.png")}/>
          
					<h5>Please enter your registered email address below
					and we will send your reset password link.</h5>
				</div>
        <Field
          name="email"
          type="text"
          component={renderField}
          label="Email"
        />
          {error && <strong>{error}</strong>}
				<div className="accunt_btn text-center">
        <button type="submit" disabled={submitting} className="btn">
          Reset Password
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
    form: 'forgetForm' // a unique identifier for this form
  })(Forget)