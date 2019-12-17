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
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const submit = (values: any,image:any) => {
 


  return sleep(1000).then(() => {
  
    // if (validateForm(values)) {
  
    
    const headers = {
      headers: { 'Content-Type': 'application/json' }
    }
    
    axios.post(`${config.apiUrl}/subgenres/addSubGenre`, {
      genre_id:values.playlist_id,
        name: values.subgenre,
        type: "S"
       
    }, headers).then(function (response) {
        console.log(response.data);
      if(response.data.status==false){
        alert(response.data.message);
      }else{
        alert(response.data.message);
   window.location.href = `${config.appurl}/admin/playlists`; ; 
       }
    })
   
})
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

    if (!fields["playlist_name"]) {
      formIsValid = false;
      throw new SubmissionError({ name: 'Name field required', name_error: 'Enter Subgenre Name' })
    
    }

    // if (typeof fields["playlist_name"] !== "undefined") {
    //   if (!fields["playlist_name"].match(/^[a-zA-Z ]*$/)) {
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


  const AddSubGenre = (props: any) => {
    const { error, handleSubmit, pristine, reset, submitting } = props
  
    const [image, setimage] = useState([]);
    
    const [genres, setgenres] = useState([]);

    React.useEffect(() => {
        getdropdown();
      }, []);
  
    const getdropdown = () => {
        sleep(1000).then(() => {
      axios.get(`${config.apiUrl}/users/dropDown`)
      .then(async (response) => {
        
       
        setgenres(response.data.Genre);
       
        
      //  SetInitialValues(response.data.artist);
      }).catch(error => {
        if(error.response.status==401){
          alert("Login token has been expired!!Login again")
          localStorage.removeItem('auth_token');
        }
        console.error(`An Error Occuredd! ${error}`);
      });
      })
      }


      var genreOptions: any[] = [];

      if(genres.length!=0){
        genreOptions = Object.keys(genres).map(function(key: any,value:any) {
          if(genres[key]['_id']!="5d70fb3277e3f3361dcc580a"){
           return <option value={genres[key]['_id']} key={key}>{genres[key]['name']}</option>
          }
      });
       
      }
   
    return (
      
<>
<div id="page-wrapper">
  <div className="user_table user-form">
       <div className="row">
       <div className="col-lg-12">
                      <h3>Add Sub Genre</h3>
		<div className="inner_form">
        <div className="form_inner">
      <form onSubmit={handleSubmit((val: any) => submit(val,image))} encType="multipart/form-data" id="myform">
		
      
      <label>Genre</label>
            <Field name="playlist_id" component="select" label="genre" className="form-control"  >
            <option value="">Select a genre...</option>
          
           {genreOptions}
		</Field>
        <Field
          name="subgenre"
          type="text"
          component={renderField}
          label="Sub Genre Name"
          
        />
    
    
          
        {error && <strong>{error}</strong>}
		<div className="accunt_btn text-center">
    <div className="col-md-6">
                <a className="btn" id="back_btn" href="javascript: history.go(-1)">Back</a>
                </div>
                <div className="col-md-6">
          <Button type="submit" disabled={submitting}  className="btn" >
          Add SubGenre
         </Button>
         </div>
      	</div>
			
		
     


</form>
</div>
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