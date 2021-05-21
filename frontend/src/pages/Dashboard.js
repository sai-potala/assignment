import React from 'react'
import Navigationbar from "../components/Navigationbar";
import Profile from "../components/Profile";
import Home from "../components/Home";
import CardCreator from '../components/CardCreator'

class Dashboard extends React.Component{
    constructor(props){
        super()
        this.state=
            {
                toggle:"Home"
            }
    }

    toggleHandler = (toggleValue) =>{
        this.setState({
            ...this.state,toggle:toggleValue
        })
    }

    signoutHandler = () =>{
        sessionStorage.removeItem("userInfo")
        this.props.history.push('/')
    }

    render(){
        return (
          <div className="dashboard-container">
            <Navigationbar
              toggleHandler={this.toggleHandler}
              signoutHandler={this.signoutHandler}
            ></Navigationbar>
            {this.state.toggle === "Home" && <Home />}
            {this.state.toggle === "Profile" && <Profile />}
            {this.state.toggle === "Card" && <CardCreator />}
          </div>
        );
    }

    
}

export default Dashboard
