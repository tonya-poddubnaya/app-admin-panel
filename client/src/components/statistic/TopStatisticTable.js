import React from 'react';
import Loading from "../Loading";


export default function TopStatisticTable(props) {
    const {OUTGOING, INCOMING, isLoadingOutgoing, isLoadingIncoming} = props;
    return (
        <div className='row top-table'>
            <div className='card col l6 m6 s12'>
                <p className='card-title center-align'>OUTGOING</p>
                {!isLoadingOutgoing ?
                    <table className='striped'>
                        <thead>
                        <tr>
                            <th>Username</th>
                            <th>Messages Sent</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Object.keys(OUTGOING).map((user) => {
                            return (
                                <tr key={OUTGOING[user].id}>
                                    <a href={`/user/${OUTGOING[user].id}`}>
                                        <td>{OUTGOING[user].username}</td>
                                    </a>
                                    <td>{OUTGOING[user].messagesSent}</td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                    : <Loading/>}
            </div>
            <div className='card col l6 m6 s12'>
                <p className='card-title center-align'>INCOMING</p>
                {!isLoadingIncoming ?
                    <table className='striped'>
                        <thead>
                        <tr>
                            <th>Username</th>
                            <th>Messages Received</th>
                        </tr>
                        </thead>

                        <tbody>
                        {Object.keys(INCOMING).map((user) => {
                            return (
                                <tr key={INCOMING[user].id}>
                                    <a href={`/user/${INCOMING[user].id}`}>
                                        <td>{INCOMING[user].username}</td>
                                    </a>
                                    <td>{INCOMING[user].messagesSent}</td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                    : <Loading/>}
            </div>
        </div>

    );
}