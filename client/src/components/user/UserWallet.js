import React, {Component} from 'react';
import axios from "axios/index";
import cookie from "react-cookies";
import Loading from '../Loading';
import UserInfo from "./UserInfo";

class UserWallet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            walletInfo: {},
            transactionList: [],
            isLoading: true,
            user: ''
            // limit: 2
        };
        this.goBack = this.goBack.bind(this);
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
            '/api/user/wallet',
            null,
            {
                params: {
                    userId: this.props.userId
                }
            }
        )
            .then((response) => {
                this.setState({
                    walletInfo: response.data.wallet,
                    transactionList: response.data.transactionList,
                    isLoading: false
                })
            })
            .catch((err) => {
                this.props.history.push('/not_found');
            });
    }

    goBack() {
        this.props.history.goBack();
    }

    // onLoadMore() {
    //     this.setState({limit: this.state.limit + 5});
    // }

    dateToLocale(date) {
        const indexT = date.indexOf('T');
        const dI = new Date(date.slice(0, indexT)).toDateString();
        const dII = date.slice(indexT, date.length).replace('T', ' ');
        const a = dII.slice(dII.indexOf('.'), dII.indexOf('+'));
        const dIII = dII.replace(a, ' ');
        return dI.concat(dIII);
    }

    renderContent() {
        const {userId, username} = this.props;
        const {walletInfo, transactionList, user} = this.state;
        return (
            <div style={{marginTop: '20px'}} className="row">
                <div className="col s12 m12 l5">
                    <p className="btn" onClick={this.goBack}>Back</p>
                    <h3 className="center-align teal-text">Wallet <i
                        className="material-icons small">account_balance_wallet</i></h3>
                    <div className="card">
                        <div className="card-content">
                            <span className="card-title">{username}</span>
                            <p>User ID: {userId}</p>
                            <p>Wallet ID: {walletInfo.id}</p>
                            <h5>Balance: {walletInfo.balance}</h5>
                        </div>
                    </div>
                    <UserInfo user={user} dateToLocale={this.dateToLocale}/>
                </div>
                <div className="col s12 m12 l7">
                    <h5 className="teal-text center-align">Transactions</h5>
                    <ul className="collection">
                        {
                            transactionList.map(transaction => (
                                <li key={transaction.id} className="collection-item avatar white">
                                    <i className="material-icons circle small white-text">done</i>
                                    <span className='title'>ID: {transaction.id}</span>
                                    <p>Amount: <span className="teal-text">{transaction.amount}</span></p>
                                    {transaction.createdAt && <p>Created At: {this.dateToLocale(transaction.createdAt)}</p>}
                                    <p>Type: {transaction.type}</p>
                                    <p>Note: {transaction.note}</p>
                                </li>
                            ))

                        }
                    </ul>
                    {/*{this.state.limit < transactionList.length &&*/}
                    {/*<p className='btn' onClick={this.onLoadMore}>Load More</p>}*/}
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

export default UserWallet;