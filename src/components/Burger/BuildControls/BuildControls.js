import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label:'Salad', type:'salad'},
    {label:'Cheese', type:'cheese'},
    {label:'Bacon', type:'bacon'},
    {label:'Meat', type:'meat'}
]

const buildControls = (props) => {
    
    return (

        <div className = {classes.BuildControls}>
            <div>Build Control</div>
            {controls.map((ctrl) => {
                return <BuildControl 
                    key = {ctrl.label} 
                    label = {ctrl.label}
                    added = {() => props.ingredientAdded(ctrl.type)}
                />
            })}
        </div>
        
       
    )
}

export default buildControls;