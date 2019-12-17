import React from 'react';
// import { connect } from "react-redux";
// import store from '../store';
// import { Container, Row, Col, Form, Button } from 'react-bootstrap' 
// import { Field, reduxForm, SubmissionError } from 'redux-form'
import { Redirect } from 'react-router-dom';
import {config} from '../config/config'
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  AxiosInstance,
  AxiosAdapter,
  Cancel,
  CancelToken,
  CancelTokenSource,
  Canceler
} from 'axios';

interface fieldInterface {
    input: any;
    label: string;
    type: string;
    meta: {
        touched: boolean;
        error: string;
    };
}







const Logout =  (props: any) => {
  
  const access_token = localStorage.getItem('access_token');

  // axios
  // .get("http://posts.evarde.com/v1/api/posts",  {headers: {
  //   access_token:'7ad89d227f0e25c808b51a881c6765b3d9175dab6b0904d1fea67e6bc1ba1c4e87a54e7ad3517103323b9daf1b7ae30d'
  //   }})
  // .then(response => {
  //   console.log(response);
  //   localStorage.removeItem('auth_token');
  //   return response;
  // })
  // .then(json => {
  // })
// const headers = {
//   'Authorization': 'Bearer '+auth_token
// };
  

    const { error, handleSubmit, pristine, reset, submitting } = props
    return (
      <div className="p-5">
        <h4>Logged out successfully!</h4>
        <Redirect
          to={{
            pathname: '/'
          }}
        />
      </div>
    )
  }
  

  export default Logout;