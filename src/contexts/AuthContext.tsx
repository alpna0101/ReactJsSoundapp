import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import {config} from '../config/config'

export const AuthContext = createContext({});

const AuthContextProvider = (props: any) => {
        const [userInfo, setUserInfo] = useState([]);
        const [keydata, setkeydata] = useState('');
        const access_token = localStorage.getItem('access_token');
        const user_type = localStorage.getItem('user_type');
        let config1 = {
                headers: {
                  'access_token':access_token
                }
               }
       
        useEffect(() => {
             
              if(access_token){
                //       alert(access_token)
                //       alert(user_type)
                if(user_type=='user'){
                axios.get(`${config.apiUrl}/users/profile`,config1)
                .then((response) => {
                //        console.log(response.data,"=======");
                        setUserInfo(response.data)
                        setkeydata(response.data.length)
                }).catch((e) => {
                        // console.log(e,"=======");
                 
                        alert("Your login token has been expired.Please login again.")
                        window.location.href = `${config.appurl}/login`; 
                        localStorage.removeItem('access_token');
                        setUserInfo([])
                })
           }
              }
              
        },[])
     
        return (
                <AuthContext.Provider key = {keydata} value={{...userInfo}}>
                        {props.children}
                </AuthContext.Provider>
        )
}

export default AuthContextProvider;