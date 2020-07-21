import React from 'react';
import classes from '../Burger/Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';



const burger = (props) => {

    // let transformedIngredients = Object.entries(props.ingredients).map(([keyInd,valInd]) => {
    //     return <BurgerIngredient key = {keyInd + valInd} type = {keyInd} />   
    // })
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igkey => {
            console.log(igkey);
            console.log(props.ingredients[igkey]);
            return [...Array(props.ingredients[igkey])].map((_ , i) => {
                return <BurgerIngredient key = {igkey + i} type = {igkey}/>
            });
        })
        .reduce((arr,ele) => {
            return arr.concat(ele)
        },[]);
        if(transformedIngredients.length === 0){
            transformedIngredients = <p>please start adding ingredients</p>;
        }
    console.log(transformedIngredients);

    return(
        <div className = {classes.Burger}>
           <BurgerIngredient type = "bread-top"/>
           {transformedIngredients}
           <BurgerIngredient type = "bread-bottom"/>
        </div>
    );   
};   

export default burger;
