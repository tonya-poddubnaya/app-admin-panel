import React, {Component} from 'react';
import cookie from "react-cookies";
import axios from "axios/index";
import Loading from "../Loading";
import UserInfo from "./UserInfo";

class Messages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            isLoading: true,
            limit: 2
        };
        this.goBack = this.goBack.bind(this);
        this.onLoadMore = this.onLoadMore.bind(this);
    }

    componentDidMount() {
        if (!cookie.load('token')) {
            this.props.history.push('/');
        }
        axios.post(
            '/api/conversation/messages',
            null,
            {
                params: {
                    conversationId: this.props.conversationId
                }
            }
        )
            .then((response) => {
                console.log(response.data);
                this.setState({
                    messages: response.data,
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

    renderContent() {
        const {conversationId} = this.props;
        const {limit, messages} = this.state;
        const {user} = this.props.location.state;
        return (
            <div style={{marginTop: '20px'}} className="row">
                <div className="col s12 m4">
                    <p className="btn" onClick={this.goBack}>Back</p>
                    <h3 className="center-align teal-text">Conversation Info</h3>
                    <div className="card">
                        <div className="card-content">
                            <span className="card-title">Conversation ID: {conversationId}</span>
                        </div>
                    </div>
                    <UserInfo user={user} dateToLocale={this.dateToLocale}/>
                </div>
                <div className="col s12 m8">
                    <h5 className="teal-text center-align">Messages</h5>
                    <ul className="collection">
                        {
                            messages.slice(0, limit).map(message => (
                                <li key={message.id} className="collection-item avatar white">
                                    <i className="material-icons circle small white-text">message</i>
                                    <span className='title'>ID: {message.id}</span>
                                    <p>Message: <span className="teal-text">{message.message}</span></p>
                                    <p>Message Type: {message.messageType}</p>
                                    <p>To Number: {message.toNumber}</p>
                                    <p>From Number: {message.fromNumber}</p>
                                    {message.sendDate && <p>Send Date: {this.dateToLocale(message.sendDate)}</p>}
                                    {message.createdAt && <p>Created At: {this.dateToLocale(message.createdAt)}</p>}
                                    <p>Deleted: {message.deleted ? 'Yes' : 'No'}</p>
                                    <p>Delivery Status: {message.deliveryStatus}</p>
                                    {message.failReason && <p>Fail Reason: {message.failReason}</p>}
                                </li>
                            ))
                        }
                    </ul>
                    {limit < messages.length &&
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

export default Messages;