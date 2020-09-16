import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReactAux from '../../hocs/ReactAux/ReactAux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hocs/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';


export class BurgerBuilder extends Component {

    state = {
        purchasing: false,
    };

    componentDidMount() {
        console.log(this.props);
        this.props.onInitIngredients();
    }

    // addIngredientHandler = (type) => {
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     console.log('Type' , type);
    //     const oldCount = this.state.ingredients[type];
    //     console.log('OLDCOUNT', oldCount);
    //     const updatedCount = oldCount + 1;
    //     updatedIngredients[type] = updatedCount;

    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;

    //     this.setState({
    //         totalPrice:newPrice, ingredients:updatedIngredients
    //     })
    //     this.updatePurchaseState(updatedIngredients);

    // }

    // removeIngredientHandler = (type) => {
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     console.log('Type' , type);
    //     const oldCount = this.state.ingredients[type];
    //     console.log('OLDCOUNT', oldCount);
    //     const updatedCount = oldCount - 1;
    //     updatedIngredients[type] = updatedCount;
    //     if(oldCount <= 0){
    //         return;
    //     }

    //     const priceDeduction = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceDeduction;

    //     this.setState({
    //         totalPrice:newPrice, ingredients:updatedIngredients
    //     })   
    //     this.updatePurchaseState(updatedIngredients);
    // }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map((igkey) => {
                return ingredients[igkey];
            })
            .reduce((sum, eleVal) => {
                return sum + eleVal;
            }, 0);
        return sum > 0;
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true });
        }
        else {
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        // alert('you continue!');

        // const queryParams = [];
        // for(let i in this.state.ingredients){
        //     console.log(i);
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        // }
        // queryParams.push('price = ' + this.state.totalPrice);
        // const queryString = queryParams.join('&');
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render() {

        const disabledInfo = {
            ...this.props.ings
        }
        for (let key in disabledInfo) {
            console.log('disabledInfo', disabledInfo);
            console.log('key', key);
            console.log('disabledInfo[key]', disabledInfo[key]);
            disabledInfo[key] = disabledInfo[key] <= 0 ? true : false;
        }
        console.log('outside', disabledInfo);

        let orderSummary = null;

        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if (this.props.ings) {
            burger = (
                <ReactAux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        price={this.props.price}
                        ordered={this.purchaseHandler}
                        isAuth={this.props.isAuthenticated}
                    />
                </ReactAux>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.props.price}
            />;
        }

        return (

            <ReactAux>

                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}

            </ReactAux>

        );
    }
}

const mapStatetoProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
}

const mapDispatchtoProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    };
}

export default connect(mapStatetoProps, mapDispatchtoProps)(withErrorHandler(BurgerBuilder, axios));
