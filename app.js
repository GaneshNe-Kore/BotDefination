// const bodyParser = require('body-parser');
const config = require("./config.json")
const cors = require('cors');
const express = require('express');
const app = express()
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded())
app.use(cors());
app.use((res,req)=>{
req.send("Hello")
})
app.listen(config.port,()=>{
    console.log(`This Server is running at http://localhost:${config.port}`);
});

