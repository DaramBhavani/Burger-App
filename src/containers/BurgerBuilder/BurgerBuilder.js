import React , {Component} from 'react';
import ReactAux from '../../hocs/ReactAux/ReactAux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hocs/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad : 1,
    cheese : 1.5,
    meat : 2,
    bacon: 0.8
}

class BurgerBuilder extends Component{

    state = {
        ingredients : null,
        totalPrice:4,
        purchasable : false,
        purchasing : false,
        loading:false,
        error:false
    }

    componentDidMount () {
        axios.get('https://react-burger-app-2600b.firebaseio.com/ingredients.json')
        .then(response => {
            console.log(response);
            this.setState({ingredients:response.data});
        })
        .catch(error => {
            this.setState({error:true});
        });
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

    purchaseContinueHandler = () => {
        //alert('you continue!');
        this.setState({loading:true});
        const order = {
            ingredients : this.state.ingredients,
            price:this.state.totalPrice,
            customer: {
                name: 'Bhavani Daram',
                address: 'India',
                email: 'vani@gmail.com'
            },
            deliveryMethod: 'fast'
        };
        axios.post('/orders.json',order)
        .then(response => {
            //console.log(response);
            this.setState({loading:false,purchasing:false});
        })
        .catch(error => {
            //console.log(error);
            this.setState({loading:false,purchasing:false});
        });
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
        
        let orderSummary = null;

        let burger = this.state.error ? <p>Ingredients can't be loaded!</p>: <Spinner/>;

        if(this.state.ingredients){
            burger = (
                <ReactAux>
                    <Burger ingredients = {this.state.ingredients}/>
                    <BuildControls 
                    ingredientAdded = {this.addIngredientHandler}
                    ingredientRemoved = {this.removeIngredientHandler}
                    disabled = {disabledInfo}
                    purchasable = {this.state.purchasable}
                    price = {this.state.totalPrice}
                    ordered = {this.purchaseHandler}
                    />
                </ReactAux>
            );
            orderSummary = <OrderSummary 
            ingredients = {this.state.ingredients}
            purchaseCanceled = {this.purchaseCancelHandler}
            purchaseContinued = {this.purchaseContinueHandler}
            price = {this.state.totalPrice}
            />;
        }
        if(this.state.loading){
            orderSummary = <Spinner/>;
        }


        return(

            <ReactAux>

                <Modal show = {this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}

            </ReactAux>
            
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);
