import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import {config} from '../config/config'

export const RouteContext = createContext({});

const RouteContextProvider = (props: any) => {
        const [cuurent_path, setcuurent_path] = useState();
        const [keydata, setkeydata] = useState('');
        
        useEffect(() => {
            setcuurent_path(window.location.pathname);
        },[])
     
        return (
                <RouteContext.Provider key = {keydata} value={cuurent_path}>
                        {props.children}
                </RouteContext.Provider>
        )
}

export default RouteContextProvider;