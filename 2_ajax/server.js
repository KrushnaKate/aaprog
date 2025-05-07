const express = require('express');


const app = express();

app.use(express.json());
app.use(express.static('public'));

app.post('/register', (req,res)=>{
    console.log(req.body);
    res.status(201).json({massage: 'User registered successfully'}); 
});

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});