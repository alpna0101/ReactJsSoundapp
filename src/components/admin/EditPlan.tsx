import React, { useState } from 'react';
// import { connect } from "react-redux";
// import store from '../store';
// import { Container, Row, Col, Form, Button } from 'react-bootstrap' 
import { Field, reduxForm, SubmissionError } from 'redux-form'
import {config} from '../../config/config'
import axios from 'axios';
import upload_img from '../../images/upload_img.png';
import arrow from '../../images/right_arrow.png';
import account_logo from '../../images/account_logo.png';
import $ from "jquery";
import {MultiselectProps, Multiselect} from "react-bootstrap-multiselect-ts";
import Select, { components } from "react-select";

interface fieldInterface {
    input: any;
    label: string;
    type: string;
    value: string
    meta: {
        touched: boolean;
        error: string;
    };
}
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const submit = (values: any,Keyname:any,Keyid:any,amount:any) => {
 
  


  return sleep(1000).then(() => {
  
     if (validateForm(Keyname,amount)) {
  
    
    const headers = {
      headers: { 'Content-Type': 'application/json' }
    }
     axios.put(`${config.apiUrl}/plans/editPlan`, {
        plan_name: Keyname,
        amount: amount,
        id: Keyid
     }, headers).then(function (response) {
        // console.log(response.data);
      if(response.data.status==false){
        alert(response.data.message);
      }else{
       window.location.href = `${config.appurl}/admin/plans`; ; 
       }
    })
  }
})
}



const renderField = ({ input, label, type,value, meta: { touched, error } }: fieldInterface) => (
  <div className="form-group">
      <label>{label}</label>
      
        <input {...input} placeholder={label} type={type} className="form-control" />
        {touched && error && <span>{error}</span>}
      
    </div>
  )
 
  const validateForm= (data:any,amount:any) => {

    let fields = data;
    let errors :any = [];
    let formIsValid = true;

    if (!fields) {
      formIsValid = false;
      throw new SubmissionError({ name: 'Name field required', _error: 'Name field required' })
    
    }


    if (!amount) {
        formIsValid = false;
        throw new SubmissionError({ amount: 'Amount field required', _error: 'Amount field required' })
      
      }
    // if (typeof fields["keyword"] !== "undefined") {
    //   if (!fields["keyword"].match(/^[a-zA-Z ]*$/)) {
    //     formIsValid = false;
    //   throw new SubmissionError({ name: 'Please enter alphabet characters only.', _error: 'Register failed!' })
    //   }
    // }
 
 
    return formIsValid;


  }







const Login = (props: any) => {
  const { error, handleSubmit, pristine, reset, submitting } = props

  const [amount, setamount] = useState([]);
  const [Keyname, setkeyname] = useState(' ');
  const [Keyid, setkeyid] = useState();

  
  let id = props.match.params.id;
  React.useEffect(() => {

      getkeywords();
 
  
   }, []);

  const getkeywords = () =>{
    axios.get(`${config.apiUrl}/plans/getPlan/`+id)
    .then(async (response) => {
      setamount(response.data.plan[0].amount);
      setkeyname(response.data.plan[0].plan_name)
      setkeyid(response.data.plan[0]._id)
      
      }).catch(error => {
      if(error.response.status==401){
        alert("Login token has been expired!!Login again")
        localStorage.removeItem('auth_token');
      }
      console.error(`An Error Occuredd! ${error}`);
    })
  }

  const handleChangeekey =(e:any)=>{
    // if(e.target.value){
      setkeyname(e.target.value)
    // }else{
    //   setkeyname("")
    // }
   
   
   }
   const handleChangeeam =(e:any)=>{
   
        setamount(e.target.value)
   }
   

  return (
    <div id="page-wrapper">
    <div className="user_table user-form">
         <div className="row">
         <div className="col-lg-12">
         <h3>Edit Plan</h3>
         {error && <strong style={{color:"red"}}>{error}</strong>}
         <div className="user-form">
            <form onSubmit={handleSubmit((val: any) => submit(val,Keyname,Keyid,amount))}>
          {
			     (() => {
           if (Keyname!= undefined)
          return <> <div className="col-md-8">
            <label>Name</label>
             <input type="text" placeholder="Edit Plan Name" name="keyname" value={Keyname}    onChange={handleChangeekey} className="form-control" id="email" />
            
            </div>
            <div className="col-md-8">
             <label>Amount</label>
             <input type="text" placeholder="Edit  amount" name="amount" value={amount}    onChange={handleChangeeam} className="form-control" id="email" />
             </div>
           </>
            })()
        }
           
              <div className="col-md-8">
              <div className="accunt_btn text-center">
              <div className="col-md-4">
                <a className="btn" id="back_btn" href="javascript: history.go(-1)">Back</a>
                </div>
                <div className="col-md-4">
              <button type="submit" disabled={submitting} className="btn">Update</button>
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
  form: 'loginForm'
})(Login)