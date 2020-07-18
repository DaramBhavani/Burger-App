import React from 'react';
import Auxiliary from '../../hocs/ReactAux';
import classes from './Layout.module.css';

const layout = (props) => {
    return(

        <Auxiliary>
            <div>
                Toolbar,SideDrawer,BackDrop
            </div>
            <main className = {classes.Content}>
                {props.children}
            </main>
        </Auxiliary>
    );
    
}

export default layout;