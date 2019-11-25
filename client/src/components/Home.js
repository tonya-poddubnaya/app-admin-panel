import React, {Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookies'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            wrong: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        console.log(cookie.load('token'));
        if (cookie.load('token')) {
            this.props.history.push('/search');
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        const {username, password} = this.state;
        axios.post(
            '/api/login',
            null,
            {
                params: {
                    username: username,
                    password: password
                }
            }
        )
            .then((response) => {
                if (response && window) {
                    window.location.href = "/search";
                }
            })
            .catch(err => {
                console.log(err);
                this.setState({wrong: true});
            });
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        return (
            <div>
                <h5 style={{margin: '5% 0'}} className='center-align'>Welcome to App Admin Panel</h5>
                <div className="content row">
                    <form className="col l4 m6 s10 offset-s1 offset-l4 offset-m3" onSubmit={this.handleSubmit}>
                        <div className=" card">
                            <div className="card-content">
                                <div className="row">
                                    <input onChange={this.onChange} placeholder="Username" name="username" type="text"
                                           className="validate" autoFocus/>
                                </div>
                                <div className="row">
                                    <div className="input-field">
                                        <input onChange={this.onChange} placeholder="Password" name="password"
                                               type="password" className="validate"/>
                                    </div>
                                </div>
                                {this.state.wrong &&
                                <div className='red-text center-align'>Wrong username or password</div>}

                            </div>
                        </div>
                        <button className="btn">Login</button>
                    </form>
                </div>
            </div>
        );
    }
}


export default Home;