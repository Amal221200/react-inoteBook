const connectToMongoose =  require("./db");
const express = require('express');
const app = express();
const port = 3000;

connectToMongoose();

// All routes
// Authentication
app.use('/api/auth', require('./routes/auth'))
// Notes
app.use('/api/notes', require('./routes/notes'))

app.listen(port, ()=>{
    console.log(`App listening at http://localhost:${port} `)
})
