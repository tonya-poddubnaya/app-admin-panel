const axios = require('axios');
const querystring = require('querystring');
const keys = require('../config/keys');

module.exports = (app) => {

    app.post('/api/login', async (req, res) => {
        let token = '';
        console.log(keys);
        const data = await axios.post(`${keys.host}/oauth/token`,
            querystring.stringify({
                grant_type: 'password',
                username: req.query.username,
                password: req.query.password

            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': keys.authorizationHeader
                }
            })
            .then((response) => {
                token = response.data.access_token;
                return response;
            })
            .catch((error) => {
                return error;
            });
        if (data.status) {
            res.cookie('token', token, {
                expires: new Date(Date.now() + 8 * 3600000) // cookie will be removed after 8 hours
            });
            res.sendStatus(data.status);
        } else {
            res.status(403).send(data);
        }
    });

    app.get('/api/logout', (req, res) => {
        res.clearCookie('token');
        res.redirect('/');
    });

    app.post('/api/registration/emailFilter', async (req, res) => {
        const token = req.cookies.token;
        await axios.post(`${keys.host}/admin/registration/emailFilter`,
            {
                "email": req.query.email,
                "signature": keys.signature
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`

                }
            })
            .then((response) => {
                res.sendStatus(200);
            })
            .catch((error) => {
                res.sendStatus(error.response.status);
            });
    });

};

