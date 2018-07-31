const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3000;

let app = express();
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res)=>{
    res.send('hi there');
});

app.listen(PORT, ()=>{
    console.log(`app up on ${PORT}`)
});