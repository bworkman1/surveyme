const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// INDEX PAGE
app.get('/', (req, res) => {
    res.send({ bye: 'buddy' });
})

// START THE APP
app.listen(PORT);