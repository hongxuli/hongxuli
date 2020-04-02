const express = require('express')
const expressSession = require('express-session')
const passport = require('./interfaces/utils/passport')
const mongoose = require('mongoose')
const dbConfig = require("./dbs/config"); 


const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000
const app = express()


mongoose.connect(dbConfig.dbs, {
  useNewUrlParser: true
});


app.use(expressSession({
    secret:'tracker',
    resave:false,
    saveUninitialized:false
}))


//initialize passport 
app.use(passport.initialize())
app.use(passport.session())





app.listen(port,host,()=>{
    console.log(`Server listening on http://${host}:${port}`);
})


