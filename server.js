const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const { isEmail } = require('validator');

app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "/public")));

app.post('/api/subscribe', (req, res, next) => {
    const { email ='', name='', ...params } = req.body;
    if (!isEmail(email)) {
        res.status(400).json({
            errors: [{ pointer: 'email', message: 'Email is invalid' }],
        });
        return;
    }
    if (name === '') {
        res.status(400).json({
            errors: [{ pointer: 'name', message: 'name is required' }],
        });
        return;
    }
    res.status(201).json({
        'subscribe': 'success'
    });
})

app.listen(3000, () => {
    console.log('listening on port 3000')
})