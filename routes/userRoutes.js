const axios = require('axios');
const keys = require('../config/keys');

module.exports = (app) => {

    app.post('/api/search', async (req, res) => {
        const token = req.cookies.token;
        await axios.post(`${keys.host}/admin/user/search`,
            {
                "searchCriteria": req.query.searchField,
                "signature": keys.signature,
                "pagination": {
                    "page": req.query.page,
                    "size": req.query.size
                }
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`

                }
            })
            .then((response) => {
                res.send(response.data);
            })
            .catch((error) => {
                res.send(error);
            });
    });

    app.post('/api/user', async (req, res) => {
        const token = req.cookies.token;
        await axios.post(`${keys.host}/admin/user/info`,
            {
                "userId": req.query.userId,
                "signature": keys.signature
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`

                }
            })
            .then((response) => {
                res.send(response.data);
            })
            .catch((error) => {
                res.sendStatus(error.response.status);
            });
    });

    app.post('/api/user/confirmEmail', async (req, res) => {
        const token = req.cookies.token;
        await axios.post(`${keys.host}/admin/user/confirmEmail`,
            {
                "userId": req.query.userId,
                "signature": keys.signature
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`

                }
            })
            .then((response) => {
                console.log('FIRST RESPONSE EMAIL: ', response);
                res.sendStatus(response.status);
            })
            .catch((error) => {
                if(error.response.status){res.sendStatus(error.response.status);}
            });
    });

    app.post('/api/user/delete', async (req, res) => {
        const token = req.cookies.token;
        await axios.post(`${keys.host}/admin/user/delete`,
            {
                "userId": req.query.userId,
                "signature": keys.signature
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`

                }
            })
            .then((response) => {
                console.log('FIRST RESPONSE DELETE: ', response);
                res.sendStatus(response.status);
            })
            .catch((error) => {
                console.log('FIRST ERROR', error);
                if(error.response.status){res.sendStatus(error.response.status);}
            });
    });

    app.post('/api/user/wallet', async (req, res) => {
        const token = req.cookies.token;
        await axios.post(`${keys.host}/admin/user/wallet`,
            {
                "userId": req.query.userId,
                "signature": keys.signature
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`

                }
            })
            .then((response) => {
                res.send(response.data);
            })
            .catch((error) => {
                res.sendStatus(error.response.status);
            });
    });

    app.post('/api/user/conversations', async (req, res) => {
        const token = req.cookies.token;
        await axios.post(`${keys.host}/admin/user/conversations`,
            {
                "userId": req.query.userId,
                "signature": keys.signature
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`

                }
            })
            .then((response) => {
                res.send(response.data);
            })
            .catch((error) => {
                res.sendStatus(error.response.status);
            });
    });

    app.post('/api/conversation/messages', async (req, res) => {
        const token = req.cookies.token;
        await axios.post(`${keys.host}/admin/user/conversations/messages`,
            {
                "conversationId": req.query.conversationId,
                "signature": keys.signature
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`

                }
            })
            .then((response) => {
                res.send(response.data);
            })
            .catch((error) => {
                res.sendStatus(error.response.status);
            });
    });
};

