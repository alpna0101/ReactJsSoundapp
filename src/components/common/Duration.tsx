import React from 'react';
import { connect } from "react-redux";

interface countInterface {
    
    seconds:any

}

const Duration = (props: countInterface) => {
    //const countt = store.getState().counter 
    // console.info('-----^^^^^66', `P${Math.round(props.seconds)}S`)
    return (
        <time dateTime={`P${Math.round(props.seconds)}S`} >
      {format(props.seconds)}
</time>
    )
}

const format =   (seconds:any) => {
 
    const date = new Date(seconds * 1000)
    const hh = date.getUTCHours()
    const mm = date.getUTCMinutes()
    const ss = pad(date.getUTCSeconds())
    console.log(ss,"secondsss")
    if (hh) {
      return `${hh}:${pad(mm)}:${ss}`
    }
    return `${mm}:${ss}`
  }
  
  const pad = (string:any) => {
    return ('0' + string).slice(-2)
  }

export default Duration;