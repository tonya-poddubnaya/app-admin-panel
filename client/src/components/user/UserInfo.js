import React from 'react';

export default function UserInfo(props) {
    const {user, googleInfo, deviceInfo, dateToLocale} = props;
    return (
        <div className="card">
            <div className="card-content">
                <span className="card-title">{user.username}</span>
                <p><span>User ID: </span>{user.id}</p>
                <p><span>Created At: </span>{dateToLocale(user.createdAt)}</p>
                {googleInfo &&
                <div className='row'>
                    <span className='card-title'>Google info:</span>
                    <div className='col l6 m6 s12'>
                        <p><span>Google ID: </span>{googleInfo.googleId}</p>
                        <p><span>Email: </span>{googleInfo.email}</p>
                        <p><span>Email Verified:</span> {googleInfo.emailVerified ? 'Yes' : 'No'}</p>
                        <p><span>Name: </span>{googleInfo.name}</p>
                        <p><span>Locale: </span>{googleInfo.locale}</p>
                    </div>
                    <div className='col l6 m6 s12'>
                        <a href={googleInfo.pictureUrl} target='_blank' rel="noopener noreferrer"><img className='google-picture' alt={googleInfo.name} src={googleInfo.pictureUrl}/></a>
                    </div>
                </div>
                }
                {deviceInfo &&
                <>
                    <span className='card-title'>Device Info Entity:</span>
                    <p><span>ID: </span>{deviceInfo.id}</p>
                    <p><span>Created At: </span>{dateToLocale(deviceInfo.createdAt)}</p>
                    <p><span>Updated At: </span>{dateToLocale(deviceInfo.updatedAt)}</p>
                    <p><span>Deleted: </span>{deviceInfo.deleted ? 'Yes': 'No'}</p>
                    <p><span>User ID: </span>{deviceInfo.userId}</p>
                    <p><span>Manufacturer: </span>{deviceInfo.manufacturer}</p>
                    <p><span>Model: </span>{deviceInfo.model}</p>
                    <p><span>Device ID: </span>{deviceInfo.deviceId}</p>
                    <p><span>Device Locale: </span>{deviceInfo.deviceLocale}</p>
                    <p><span>Android Version: </span>{deviceInfo.androidVersion}</p>
                    <p><span>Package Name: </span>{deviceInfo.packageName}</p>
                    <p><span>App Version: </span>{deviceInfo.appVersion}</p>
                </>
                }
                <ul className='card-title'>Phones:</ul>
                {user.phones.map((phone) => (
                    <li style={{listStyle: 'none'}}>
                        <p><span>Number: </span>{phone.phoneNumber}</p>
                        <p><span>Created At: </span>{dateToLocale(phone.createdAt)}</p>
                        {phone.paidDate && <p><span>Paid Date: </span>{dateToLocale(phone.paidDate)}</p>}
                        <p><span>Monthly Price: </span>{phone.monthlyPrice}</p>
                        <p><span>Country ISO: </span>{phone.countryIso}</p>
                        <p><span>Deleted: </span>{phone.deleted ? 'Yes' : 'No'}</p>
                        <p><span>Shared: </span>{phone.shared ? 'Yes' : 'No'}</p>
                        {phone.addressRequirements && <p><span>Address Requirements: </span>{phone.addressRequirements}</p>}
                        <p><span>Path Sid: </span>{phone.pathSid}</p>
                        {phone.updatedAt && <p><span>Updated At: </span>{dateToLocale(phone.updatedAt)}</p>}
                    </li>
                ))}
            </div>
        </div>
    );
}