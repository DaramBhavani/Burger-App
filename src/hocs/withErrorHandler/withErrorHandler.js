import React, {Component} from 'react';
import ReactAux from '../../hocs/ReactAux/ReactAux';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {

    return class extends Component { 

        state = {
            error: null
        }

        componentDidMount() {

            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
            });

            this.resInterceptor = axios.interceptors.response.use(res => res  , error => {
                this.setState({error: error});
            }); 
        }

        componentWillUnmount() {
            console.log('componentWillUnmount', this.reqInterceptor,this.resInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.reqInterceptor);
        }

        errorConfirmedHandler =  ( ) => {
            this.setState({error:null});
        }

        render() {

            return (
                <ReactAux>
                    <Modal show = {this.state.error}
                    modelClosed = {this.errorConfirmedHandler}>
                        { this.state.errorr ? this.state.error.message : null} 
                        something went wrong!!
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </ReactAux>
            )
        }
    }
}

export default withErrorHandler;