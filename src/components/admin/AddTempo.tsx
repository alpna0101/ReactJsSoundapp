import React, { useState } from 'react';
// import { connect } from "react-redux";
// import store from '../store';
 import {  Button } from 'react-bootstrap' 
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
    meta: {
        touched: boolean;
        error: string;
    };
}

 
const renderField = ({ input, label, type, meta: { touched, error } }: fieldInterface) => (
  <div className="form-group">
      <label>{label}</label>
      
        <input {...input} placeholder={label} type={type} className="form-control" />
        {touched && error && <span>{error}</span>}
      
    </div>
  )
 
  const validateForm= (data:any) => {
   console.log("testttt");
    let fields = data;
    let errors :any = [];
    let formIsValid = true;

    if (!fields["tempo"]) {
      formIsValid = false;
      throw new SubmissionError({ name: 'Name field required', _error: 'Enter Tempo Name' })
    
    }

    // if (typeof fields["tempo"] !== "undefined") {
    //   if (!fields["tempo"].match(/^[a-zA-Z ]*$/)) {
    //     formIsValid = false;
    //   throw new SubmissionError({ name: 'Please enter alphabet characters only.', _error: 'Register failed!' })
    //   }
    // }
 
 
    return formIsValid;


  }





function readURL(input:any) {
if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function(e:any) {
        $('#imagePreview').css('background-image', 'url('+e.target.result +')');
        $('#imagePreview').hide();
        $('#imagePreview').fadeIn(650);
    }
    reader.readAsDataURL(input.files[0]);
}
}
$("#imageUpload").change(function() {

readURL(this);

});

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const submit = (values: any,image:any) => {
 


  return sleep(1000).then(() => {
  
     if (validateForm(values)) {
  
    
    const headers = {
      headers: { 'Content-Type': 'application/json' }
    }
    
    axios.post(`${config.apiUrl}/tempos/addTempo`, {
       
        tempo: values.tempo
       
    }, headers).then(function (response) {
        console.log(response.data);
      if(response.data.status==false){
        alert(response.data.message);
      }else{
        alert(response.data.message);
       window.location.href = `${config.appurl}/admin/tempo`; ; 
       }
    })
  }
})
}

  const AddSubGenre = (props: any) => {
    const { error, handleSubmit, pristine, reset, submitting } = props
  
    const [image, setimage] = useState([]);
    
    const [genres, setgenres] = useState([]);

   

    
   

    return (
      
<>
<div id="page-wrapper">
  <div className="user_table user-form">
       <div className="row">
       <div className="col-lg-12">
                      <h3>Add Tempo</h3>
                      <div className="user-form">
      <form onSubmit={handleSubmit((val: any) => submit(val,image))} encType="multipart/form-data" id="myform">
		
      <div className="col-md-8"> <Field
          name="tempo"
          type="text"
          component={renderField}
          label="Tempo Name"
          
        />
    
    
          
    {error && <strong style={{color:"red"}}>{error}</strong>}</div>
    <div className="col-md-8">
		<div className="accunt_btn text-center">
    <div className="col-md-4">
                <a className="btn" id="back_btn" href="javascript: history.go(-1)">Back</a>
                </div>
                <div className="col-md-4">
          <Button type="submit" disabled={submitting}  className="btn">
          Submit
         </Button>
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





</>





)
  }

  export default reduxForm({
    form: 'loginForm' // a unique identifier for this form
  })(AddSubGenre)