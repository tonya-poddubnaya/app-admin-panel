const axios = require('axios');
const keys = require('../config/keys');

module.exports = (app) => {

    app.post('/api/statistics', async (req, res) => {
        const token = req.cookies.token;
        console.log('REQUEST: ', req.query.statisticRequestType);
        await axios.post(`${keys.host}/admin/statistics`,
            {
                "startDate": req.query.startDate,
                "endDate":req.query.endDate,
                "statisticRequestType":req.query.statisticRequestType,
                "statisticInterval":req.query.statisticInterval,
                "signature": keys.signature
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`

                }
            })
            .then((response) => {
                console.log('RESPONSE: ', req.query.statisticRequestType);
                console.log('Response', response.data);
                res.send(response.data);
            })
            .catch((error) => {
                console.log('ERROR', error);
                res.send(error.response.data);
            });
    });

    app.post('/api/statistics/top', async (req, res) => {
        const token = req.cookies.token;
        await axios.post(`${keys.host}/admin/statistics/topSmsUser`,
            {
                "startDate": req.query.startDate,
                "endDate":req.query.endDate,
                "messageType":req.query.messageType,
                "signature": keys.signature
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                console.log('Response', response.data);
                res.send(response.data);
            })
            .catch((error) => {
                console.log('ERROR', error);
                res.send(error.response.data);
            });
    });

};

