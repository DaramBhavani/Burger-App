import React , {Component} from 'react';
import Auxiliary from '../../hocs/ReactAux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

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
        totalPrice:4
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
            totalprice:newPrice, ingredients:updatedIngredients
        })
    
    }

    removeIngredientHandler(){

    }

    render(){

        return(
            <Auxiliary>
                <Burger ingredients = {this.state.ingredients}/>
                <div> BuildControls</div>
                <BuildControls ingredientAdded = {this.addIngredientHandler}/>
          
            </Auxiliary>
        );
    }
}

export default BurgerBuilder;
