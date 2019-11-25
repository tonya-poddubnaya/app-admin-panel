import React from 'react';
import '../../style.css'

export default function Modal(props) {
    return (
        <div className="myBackdrop" onClick={props.toggleModal}>
            <div className="confirmModal" onClick={e => e.stopPropagation()}>
                <div className="modal-content">
                    <h4 className="black-text">Are you sure?</h4>
                </div>
                <div className="modal-footer">
                    <button className='btn' onClick={props.confirm} style={{marginRight: '10px'}}>Yes</button>
                    <button className='btn red darken-3 closeButton' onClick={props.toggleModal}>No</button>
                </div>
            </div>
        </div>
    );
}

