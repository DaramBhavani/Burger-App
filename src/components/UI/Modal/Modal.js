import React, {Component} from 'react';
import classes from './Modal.module.css';
import ReactAux from '../../../hocs/ReactAux/ReactAux';
import BackDrop from '../Backdrop/Backdrop';

class Modal extends Component{

    shouldComponentUpdate(nextProps,nextState){
       return nextProps.show !== this.props.show;
    }

    componentDidUpdate(){
        console.log('[Modal] willUpdate');
    }

    render(){

        return(
            <ReactAux>
                <BackDrop show ={this.props.show} clicked = {this.props.modalClosed}/>
                <div className = {classes.Modal}
                style ={{
                    transform : this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity : this.props.show ?  '1' : '0'
                }}>
                {this.props.children}
            </div>
            </ReactAux>
        );

    }

}

export default Modal;