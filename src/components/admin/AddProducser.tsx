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
let config1 = {
  headers: {
    'access_token':access_token
  }
  }
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))



const submit = (values: any,image:any) => {
     
  
    
  return sleep(1000).then(() => {
  
    if (validateForm(values)) {
  
    
    const headers = {
      headers: { 'Content-Type': 'application/json' }
    }
    
    axios.post(`${config.apiUrl}/producers/addProducer`, {
       
        producer_name: values.mood
       
    }, config1).then(function (response) {
        console.log(response.data);
      if(response.data.status==false){
        alert(response.data.message);
      }else{
       window.location.href = `${config.appurl}/admin/producers`; ; 
       }
    })
  }
})
}


 
  const validateForm= (data:any) => {
   console.log("testttt");
    let fields = data;
    let errors :any = [];
    let formIsValid = true;

    if (!fields["mood"]) {
      formIsValid = false;
      throw new SubmissionError({ name: 'Name field required', _error: 'Add Mood Name' })
    
    }

    // if (typeof fields["mood"] !== "undefined") {
    //   if (!fields["mood"].match(/^[a-zA-Z ]*$/)) {
    //     formIsValid = false;
    //   throw new SubmissionError({ name: 'Please enter alphabet characters only.', _error: 'Please enter alphabet characters only' })
    //   }
    // }
 
 
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
      
    const [image, setimage] = useState([]);
    return (
      <div id="page-wrapper">
      <div className="user_table user-form">
           <div className="row">
           <div className="col-lg-12">
           <h3>Add Producer</h3>
           <div className="user-form">
              <form onSubmit={handleSubmit((val: any) => submit(val,image))}>
              <div className="col-md-8">
              <Field
          name="mood"
          type="text"
          component={renderField}
          label="Producer Name"
          
        />  {error && <strong style={{color:"red"}}>{error}</strong>}</div>
          
        
                <div className="col-md-8">
                <div className="accunt_btn text-center">
                <div className="col-md-4">
                <a className="btn" id="back_btn" href="javascript: history.go(-1)">Back</a>
                </div>
                <div className="col-md-4">
                <button type="submit" disabled={submitting} className="btn">Submit</button>
                  </div>
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
  })(Login)