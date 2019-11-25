const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(bodyParser.urlencoded({
    extended:true
}));


app.use(bodyParser.json());

require('./routes/authRoutes')(app);
require('./routes/userRoutes')(app);
require('./routes/statisticRoutes')(app);

if(process.env.NODE_ENV === 'production') {
    //Express will serve up production assets like our main.js file
    app.use(express.static('client/build'));

    //Express will serve up the index.html if it doesn't recognize the route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
};

const PORT = process.env.PORT || 5000;
app.listen(PORT);
