import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import {connect} from 'react-redux';


import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    
    // state = {
    //     ingredients: {
    //         salad:1,
    //         meat:1,
    //         bacon:1,
    //         cheese:1
    //     },
    //     price: 0
    // }

    // componentDidMount () {
    //     const query = new URLSearchParams( this.props.location.search );
    //     const ingredients = {};
    //     let price = 0;
    //     for ( let param of query.entries() ) {
    //         // ['salad', '1']
    //         if (param[0] === 'price') {
    //             price = param[1];
    //         } else {
    //             ingredients[param[0]] = +param[1];
    //         }
    //     }
    //     this.setState( { ingredients: ingredients, totalPrice: price } );
    // }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.push( '/checkout/contact-data' );
    }

    render () {
       
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
                <Route 
                    path={this.props.match.url + '/contact-data'} 
                    component = {ContactData}
                />
            </div>
        );
    }
}

const mapStatetoProps = state => {
    return{
        ings:state.ingredients,
    }
}

export default connect(mapStatetoProps)(Checkout);