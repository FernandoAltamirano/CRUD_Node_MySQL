const express = require('express')
const path = require('path')
const morgan = require('morgan')
const mysql = require('mysql')
const myconnection = require('express-myconnection')
const customer = require('./routes/customer')
const app = express()


//SETTING
app.set('port',process.env.PORT || 3000)
app.set('view engine','ejs') 
app.set('views',path.join(__dirname,'views'))

//MIDDLEWARS
app.use(morgan('dev'))
app.use(myconnection(mysql,{
    host: 'localhost',
    user: 'root',
    password: '986175',
    port: 3306,
    database: 'CRUD_Node_MySQL'
},'single'))
app.use(express.urlencoded({
    extended: false
}))

//ROUTES
app.use('/',customer)

//PUBLIC FILES
app.use(express.static(path.join(__dirname,'public')))

//LISTENING
app.listen(app.get('port'),() => {
    console.log('Server is running in: '+ 'http://localhost:'+app.get('port'));
})