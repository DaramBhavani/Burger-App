import React, {Component} from 'react';
import ReactAux from '../../../hocs/ReactAux/ReactAux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    componentDidUpdate() {
        console.log('[OrderSummary] WillUpdate');
    }

    render(){

        const ingredientSummary = Object.keys(this.props.ingredients)
            .map((igkey) => {
                return (
                    <li key = {igkey}>
                        <span style = {{textTransform:'uppercase'}}>{igkey}</span> : {this.props.ingredients[igkey]}
                    </li>   
                    ); //<li> salad : 1 </li>
            });

        return(

            <ReactAux>                                                                                  
                <h3> Your order</h3>
                <p> A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to checkout?</p>
                <Button 
                   btnType = "Danger" 
                   clicked = {this.props.purchaseCanceled}>
                   CANCEL
                </Button>
                <Button
                   btnType = "Success" 
                   clicked = {this.props.purchaseContinued}>
                   CONTINUE
                </Button>
            </ReactAux>

        );

    }

}

export default OrderSummary;

