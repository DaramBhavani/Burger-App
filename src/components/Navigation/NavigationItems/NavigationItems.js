import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';

const navigationItems = (props) => {

    return (

        <div>
            <ul className={classes.NavigationItems}>
                <NavigationItem link="/" exact>Burger Builder</NavigationItem>
                {props.isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
                {!props.isAuthenticated
                    ? <NavigationItem link="/auth">Authenticate</NavigationItem>
                    : <NavigationItem link="/logout">Logout</NavigationItem>
                }
            </ul>
        </div>

    );
}

export default navigationItems;