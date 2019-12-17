import React from 'react';
import { connect } from "react-redux";

interface countInterface {
    counter: number
}

const Count = (props: countInterface) => {
    //const countt = store.getState().counter 
    return (
        <h2>{props.counter}</h2>
    )
}

const mapStateToProps = (state: any) => ({
    counter: state.counter
  });



export default connect(mapStateToProps)(Count);