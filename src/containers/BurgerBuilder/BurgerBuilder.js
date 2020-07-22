import React , {Component} from 'react';
import Auxiliary from '../../hocs/ReactAux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad : 1,
    cheese : 1.5,
    meat : 2,
    bacon: 0.8
}

class BurgerBuilder extends Component{

    state = {
        ingredients : {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice:4,
        purchasable : false,
        purchasing : false
    }

    addIngredientHandler = (type) => {
        const updatedIngredients = {
            ...this.state.ingredients
        };
        console.log('Type' , type);
        const oldCount = this.state.ingredients[type];
        console.log('OLDCOUNT', oldCount);
        const updatedCount = oldCount + 1;
        updatedIngredients[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({
            totalPrice:newPrice, ingredients:updatedIngredients
        })
        this.updatePurchaseState(updatedIngredients);
    
    }

    removeIngredientHandler = (type) => {
        const updatedIngredients = {
            ...this.state.ingredients
        };
        console.log('Type' , type);
        const oldCount = this.state.ingredients[type];
        console.log('OLDCOUNT', oldCount);
        const updatedCount = oldCount - 1;
        updatedIngredients[type] = updatedCount;
        if(oldCount <= 0){
            return;
        }

        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({
            totalPrice:newPrice, ingredients:updatedIngredients
        })   
        this.updatePurchaseState(updatedIngredients);
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map((igkey) => {
                return ingredients[igkey];
            })
            .reduce((sum , eleVal) => {
                return sum + eleVal;
            },0);
            this.setState({purchasable : sum > 0});
    }

    purchaseHandler = () => {
        this.setState({purchasing : true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing:false});
    }

    render(){

        const disabledInfo = {
            ...this.state.ingredients
        }       
        for(let key in disabledInfo){
            console.log('disabledInfo' , disabledInfo);
            console.log('key', key);
            console.log('disabledInfo[key]', disabledInfo[key]);
            disabledInfo[key] = disabledInfo[key] <= 0 ? true : false;
        }      
        console.log('outside', disabledInfo);                                                                                                                      

        return(
            <Auxiliary>
                <Burger ingredients = {this.state.ingredients}/>
                <div> BuildControls</div>
                <BuildControls 
                   ingredientAdded = {this.addIngredientHandler}
                   ingredientRemoved = {this.removeIngredientHandler}
                   disabled = {disabledInfo}
                   purchasable = {this.state.purchasable}
                   price = {this.state.totalPrice}
                   ordered = {this.purchaseHandler}
                />
                <Modal show = {this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary ingredients = {this.state.ingredients}/>
                </Modal>

          
            </Auxiliary>
        );
    }
}

export default BurgerBuilder;
