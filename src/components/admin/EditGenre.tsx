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
import profl_bg from '../../images/upload_img.png';

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
const access_token = localStorage.getItem('admin_access_token');
let config1 = {
  headers: {
    'access_token':access_token
  }
  }
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const submit = (values: any,Keyname:any,Keyid:any,image:any) => {
 
  return sleep(1000).then(() => {
  
    // if (validateForm(values)) {
  
      var formData = new FormData();
      
      formData.append("image", image);
      formData.append("name", Keyname);
      formData.append("id", Keyid);
      formData.append("type", "G");
    // const headers = {
    //   headers: { 'Content-Type': 'application/json' }
    // }
     axios.put(`${config.apiUrl}/genres/editGenre`,formData,config1).then(function (response) {
        // console.log(response.data);
      if(response.data.status==false){
        alert(response.data.message);
      }else{
        alert(response.data.message);
      window.location.href = `${config.appurl}/admin/playlists`; ; 
       }
    })
   
})
}



const renderField = ({ input, label, type,value, meta: { touched, error } }: fieldInterface) => (
  <div className="form-group">
      <label>{label}</label>
      
        <input {...input} placeholder={label} type={type} className="form-control" />
        {touched && error && <span>{error}</span>}
      
    </div>
  )
 
  const validateForm= (data:any) => {

    let fields = data;
    let errors :any = [];
    let formIsValid = true;

    if (!fields["keyname"]) {
      formIsValid = false;
      throw new SubmissionError({ name: 'Name field required', name_error: 'Name field required' })
    
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

  const [mykeywords, setkeywords] = useState([]);
  const [Keyname, setkeyname] = useState(' ');
  const [Keyid, setkeyid] = useState();
  const [image, setimage] = useState([]);
  
  let id = props.match.params.id;
  React.useEffect(() => {

      getkeywords();
 
  
   }, []);

  const getkeywords = () =>{
    console.log("=============");
    axios.get(`${config.apiUrl}/genres/getGenre/`+id,config1)
    .then(async (response) => {
       
      console.log(response,"=============");
      setkeywords(response.data.key);
      setkeyname(response.data.genre[0].name)
      setimage(response.data.genre[0].image)
      setkeyid(response.data.genre[0]._id)
    
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
    console.log(e.target.value,"=============");
   
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

  return (
    <div id="page-wrapper">
    <div className="user_table user-form adminclass">
         <div className="row">
         <div className="col-lg-12">
         <h3>Edit Playlist</h3>
         <div className="user-form">
            <form onSubmit={handleSubmit((val: any) => submit(val,Keyname,Keyid,image))}>
            <div className="form-group">
				   	<div className="avatar-upload">
						<div className="avatar-edit">
						<input type='file' id="imageUpload" accept=".png, .jpg, .jpeg" onChange={ (e:any) => setimage(e.target.files[0]) }  />
							<label htmlFor="imageUpload"></label>
						</div>
						{image ? (
                   
					 <div className="avatar-preview">
					  
					 <div  className="imagepreview" id="imagePreview3" style={ { backgroundImage:`url(${image})`} }>
					 </div>
					 </div>
					 ):(
					   <div className="avatar-preview">
					   <div className="imagepreview" id="imagePreview33" style={ { backgroundImage: "url("+profl_bg+")" } }>
					   </div>
					   </div>
					 )}
					</div>
				<h4 className="text-center">Upload Genre Picture</h4>
				</div>
          {
			     (() => {
           if (Keyname!= undefined)
          return   <div className="col-lg-12"><div className="col-md-2"></div> <div className="col-md-8">
              <div className="form-group">
                <label>Name</label>
             <input type="text" placeholder="Edit Playlist Name" name="keyname" value={Keyname}    onChange={handleChangeekey} className="form-control" id="email" />
            </div></div></div>
            })()
        }

              {error && <strong>{error}</strong>}
              <div className="col-lg-12"><div className="col-md-2"></div>
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