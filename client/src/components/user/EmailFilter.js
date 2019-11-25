import React, {Component} from 'react';
import EmailFilterModal from "./EmailFilterModal";

class EmailFilter extends Component{
    constructor(props){
        super(props);
        this.state={isOpen:false};
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal(){
        this.setState({isOpen:!this.state.isOpen});
    }

    render(){
        return(
            <>
                <p className="waves-effect waves-light btn" onClick={this.toggleModal}>Filter Email</p>
                <EmailFilterModal show={this.state.isOpen} onClose={this.toggleModal}/>
            </>
        );
    }
}

export default EmailFilter;