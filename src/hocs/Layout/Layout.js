import React, {Component} from 'react';
import ReactAux from '../../hocs/ReactAux/ReactAux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler= () => {
        this.setState({showSideDrawer:false})
    }

    sideDrawerToggleDrawer = () => {
        this.setState( (prevState) => {
            return {showSideDrawer:!prevState.showSideDrawer};
        } );
    }

    render(){

        return(

            <ReactAux>
                <Toolbar drawerToggleClicked = {this.sideDrawerToggleDrawer}/>
                <SideDrawer  open = {this.state.showSideDrawer} closed = {this.sideDrawerClosedHandler}/>
                <main className = {classes.Content}>
                    {this.props.children}
                </main>
            </ReactAux>
        );
    }    
}

export default Layout;