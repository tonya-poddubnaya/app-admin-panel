import React, {Component} from 'react';
import '../../style.css'
import axios from "axios";
import cookie from "react-cookies";

class Modal extends Component {
    constructor(props){
        super(props);
        this.state={input:''};
        this.filterEmail = this.filterEmail.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onModalClose = this.onModalClose.bind(this);
    }

    async filterEmail(){
        if (!cookie.load('token')) {
            this.props.history.push('/');
        }
        await axios.post(
            '/api/registration/emailFilter',
            null,
            {
                params: {
                    email: this.state.input
                }
            }
        )
            .then(() => {
                this.onModalClose();
            })
            .catch((err) => {
                alert(err);
            });
    }

    onChange(e){
        this.setState({input: e.target.value});
    }
    onModalClose(){
        this.setState({input: ''});
        this.props.onClose();
    }

    render() {
        if (!this.props.show) {
            return null;
        }

        return (
            <div className="myBackdrop" onClick={this.onModalClose}>
                <div className="emailModal" onClick={e => e.stopPropagation()}>
                    <div className="modal-content">
                        <h4 className="black-text">Email Filter</h4>
                        <p className="black-text">Enter email to confirm for registration</p>
                        <input onChange={this.onChange} id="email" typeof="email" className="validate" autoFocus/>
                    </div>
                    <div className="modal-footer">
                        <button className='btn' onClick={this.filterEmail} style={{marginRight:'10px'}}>Confirm</button>
                        <button className='btn red darken-3 closeButton' onClick={this.onModalClose}>Close</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;