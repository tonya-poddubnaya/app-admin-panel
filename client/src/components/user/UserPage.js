import React, {Component} from 'react';
import axios from "axios";
import '../../style.css';
import cookie from "react-cookies";
import Loading from '../Loading';
import {Link} from 'react-router-dom';
import UserInfo from "./UserInfo";
import Modal from "./Modal";

class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            googleInfo: {},
            deviceInfo: {},
            emailConfirmed: '',
            deleted: '',
            isLoading: true,
            isOpen: false,
            buttonId: ''
        };
        this.confirmEmail = this.confirmEmail.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.dateToLocale = this.dateToLocale.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        // this.renderContent = this.renderContent.bind(this);
    }

    async componentDidMount() {
        if (!cookie.load('token')) {
            this.props.history.push('/');
        }
        await this.fetchUser();
    }

    fetchUser =() => {
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
                this.setState({
                    user: response.data.user,
                    googleInfo: response.data.googleUserInfo,
                    deviceInfo: response.data.deviceInfoEntity,
                    emailConfirmed: response.data.emailConfirmed,
                    deleted: response.data.user.deleted,
                    isLoading: false
                });
            })
            .catch((err) => {
                console.log(err);
                this.props.history.push('/not_found');
            });
    };

    confirmEmail(e) {
        e.preventDefault();
        axios.post(
            '/api/user/confirmEmail',
            null,
            {
                params: {
                    userId: this.props.userId
                }
            }
        )
            .then((response) => {
                this.setState({emailConfirmed: true, isOpen: false, buttonId: ''});
            })
            .catch((err) => {
                this.setState({isOpen: false});
                alert(err);
            });
    }

    deleteUser(e) {
        e.preventDefault();
        axios.post(
            '/api/user/delete',
            null,
            {
                params: {
                    userId: this.props.userId
                }
            }
        )
            .then((response) => {
                this.setState({deleted: true, isOpen: false, buttonId: ''});
            })
            .catch((err) => {
                this.setState({isOpen: false});
                alert(err);
            });
    }


    dateToLocale(date) {
        const indexT = date.indexOf('T');
        const dI = new Date(date.slice(0, indexT)).toDateString();
        const dII = date.slice(indexT, date.length).replace('T', ' ');
        const a = dII.slice(dII.indexOf('.'), dII.indexOf('+'));
        const dIII = dII.replace(a, ' ');
        return dI.concat(dIII);
    }

    toggleModal(e) {
        this.setState({isOpen: !this.state.isOpen, buttonId: e.target.id});
    }

    renderContent() {

        const {user, googleInfo, deviceInfo, emailConfirmed, deleted, isOpen, buttonId} = this.state;
        return (
            <>
                {isOpen &&
                <Modal
                    toggleModal={this.toggleModal}
                    confirm={buttonId === 'delete' ? this.deleteUser : this.confirmEmail}
                />
                }
                <div className="col l5 m12 s12">
                    <UserInfo user={user} googleInfo={googleInfo} deviceInfo={deviceInfo}
                              dateToLocale={this.dateToLocale}/>
                </div>
                <div className="col l7 m12 s12">
                    <div className="col s12">
                        <div className="card">
                            <div className="card-action">
                                {!emailConfirmed ?
                                    <p onClick={this.toggleModal} className="btn white green-text hover-text"
                                       id="email">Confirm
                                        Email</p>
                                    : <a className="green-text">Email Confirmed!</a>
                                }
                                {!deleted ?
                                    <p onClick={this.toggleModal} className="btn white red-text hover-text"
                                       id="delete">Delete</p>
                                    : <a className="red-text">Deleted!</a>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col s12">
                        <div className="card">
                            <div className="card-action">
                                <Link
                                    className='teal-text hover-text'
                                    to={{
                                        pathname: `/user/${user.id}/wallet`,
                                        state: {user: this.state.user}
                                    }}
                                >Wallet</Link>
                                <Link
                                    className='hover-text pink-text text-accent-3'
                                    to={{
                                        pathname: `/user/${user.id}/conversations`,
                                        state: {user: this.state.user}
                                    }}
                                >Conversations</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }


    render() {
        return (
            <div>
                <div style={{marginTop: '5%'}} className="row">
                    {this.state.isLoading ? <Loading/> : this.renderContent()}
                </div>
            </div>
        );
    }
}

export default UserPage;