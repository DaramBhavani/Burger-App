import React from 'react';
import ReactAux from '../../../hocs/ReactAux';

const orderSummary = (props) => {

    const ingredientSummary = Object.keys(props.ingredients)
        .map((igkey) => {
            return (
                <li key = {igkey}>
                    <span style = {{textTransform:'uppercase'}}>{igkey}</span> : {props.ingredients[igkey]}
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
            <p>Continue to checkout?</p>
            <button>CANCEL</button>
            <button>CONTINUE</button>
        </ReactAux>

    );

}

export default orderSummary;

