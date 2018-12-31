const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// INDEX PAGE
app.get('/', (req, res) => {
    res.send({ hi: 'there' });
})

// START THE APP
app.listen(PORT);