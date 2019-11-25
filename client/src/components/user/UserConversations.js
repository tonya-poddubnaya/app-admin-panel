import React, {Component} from 'react';
import cookie from "react-cookies";
import axios from "axios/index";
import {Link} from 'react-router-dom';
import Loading from '../Loading';
import UserInfo from "./UserInfo";

class UserMessages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            conversations: [],
            isLoading: true,
            limit: 5,
            user: ''
        };
        this.goBack = this.goBack.bind(this);
        this.onLoadMore = this.onLoadMore.bind(this);
    }

    componentDidMount() {
        if (!cookie.load('token')) {
            this.props.history.push('/');
        }
        if (this.props.location.state) {
            this.setState({user:this.props.location.state.user});
        } else {
            axios.post(
                '/api/user',
                null,
                {
                    params: {
                        userId: this.props.userId
                    }
                }
            )
                .then((response) => {
                    this.setState({user:response.data.user});
                })
                .catch((err) => {
                    alert(err);
                });
        }
        axios.post(
            '/api/user/conversations',
            null,
            {
                params: {
                    userId: this.props.userId
                }
            }
        )
            .then((response) => {
                this.setState({
                    conversations: response.data,
                    isLoading: false
                })
            })
            .catch((err) => {
                alert(err);
                // this.props.history.push('/not_found');
            });
    }

    goBack() {
        this.props.history.goBack();
    }

    onLoadMore() {
        this.setState({limit: this.state.limit + 5});
    }

    dateToLocale(date) {
        const indexT = date.indexOf('T');
        const dI = new Date(date.slice(0, indexT)).toDateString();
        const dII = date.slice(indexT, date.length).replace('T', ' ');
        const a = dII.slice(dII.indexOf('.'), dII.indexOf('+'));
        const dIII = dII.replace(a, ' ');
        return dI.concat(dIII);
    }

    //
    renderContent() {
        const {userId} = this.props;
        const {limit, conversations, user} = this.state;
        return (
            <div style={{marginTop: '20px'}} className="row">
                <div className="col s12 m4">
                    <p className="btn" onClick={this.goBack}>Back</p>
                    <h3 className="center-align teal-text">User Info</h3>
                    <UserInfo user={user} dateToLocale={this.dateToLocale}/>
                </div>
                <div className="col s12 m8">
                    <h5 className="teal-text center-align">Conversations</h5>
                    <ul className="collection">
                        {
                            conversations.slice(0, this.state.limit).map(conversation => (
                                // href={`/user/${userId}/${conversation.id}/messages`}
                                <a>
                                    <Link to={{
                                        pathname: `/user/${userId}/${conversation.id}/messages`,
                                        state: {user: user}
                                    }}>
                                        <li className="collection-item avatar white">
                                            <i className="material-icons circle small white-text">message</i>
                                            <span className='title'>ID: {conversation.id}</span>
                                            <p>Name: <span className="teal-text">{conversation.name}</span></p>
                                            <p>Number: {conversation.toNumber}</p>
                                            {conversation.createdAt &&
                                            <p>Created At: {this.dateToLocale(conversation.createdAt)}</p>}
                                            {conversation.updatedAt &&
                                            <p>Updated At: {this.dateToLocale(conversation.updatedAt)}</p>}
                                            <p>Deleted: {conversation.deleted ? 'Yes' : 'No'}</p>
                                        </li>
                                    </Link>
                                </a>
                            ))
                        }
                    </ul>
                    {limit < conversations.length &&
                    <p className='btn' onClick={this.onLoadMore}>Load More</p>}
                </div>
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.state.isLoading ? <Loading/> : this.renderContent()}
            </div>
        );
    }
}

export default UserMessages;