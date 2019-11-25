import React, {Component} from 'react';
import cookie from "react-cookies";
import EmailFilter from './user/EmailFilter';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {isLoggedIn: false};
    }

    componentDidMount() {
        if (cookie.load('token')) {
            this.setState({isLoggedIn: true});
        }
    }

    renderContent() {
        switch (this.state.isLoggedIn) {
            case null:
                return;
            case false:
                return (
                    <li><a href="/">Login</a></li>
                );
            default:
                return (
                    <>
                        <li><EmailFilter/></li>
                        <li><a href='/statistics'>Statistics</a></li>
                        <li><a href='/statistics/top'>TOP Statistic</a></li>
                        <li><a href='/search'>Search</a></li>
                        <li><a href="/api/logout" >Logout</a></li>
                    </>
                );
        }
    }

    render() {
        return (
            <nav className="teal accent-4 nav-wrapper" style={{padding: '0 20px'}}>
                <div>
                    <ul id="nav-mobile" className="right">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        )
    }
}


export default Header;