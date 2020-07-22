import React from 'react';
import classes from './Modal.module.css';
import ReactAux from '../../../hocs/ReactAux';
import BackDrop from '../Backdrop/Backdrop';

const modal = (props) => {

    return(
        <ReactAux>
            <BackDrop show ={props.show} clicked = {props.modalClosed}/>
            <div className = {classes.Modal}
            style ={{
                transform : props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity : props.show ?  '1' : '0'
            }}>
            {props.children}
        </div>
        </ReactAux>
    );
}

export default modal;