const express = require('express')
const router = express.Router()
const customerController = require('../controller/customer')

router.get('/',(req,res) => {
    req.getConnection((error,connect) => {
        customerController.list(connect)
        .then(data => {
            res.render('customer',{
                'data': data
            })
        })
        .catch(error => {
            console.log(error.message)
            res.render('error')
        })
    })
})

router.get('/userList',(req,res) => {
    req.getConnection((error,connect) => {
        customerController.list(connect)
        .then(data => {
            res.render('table',{
                'data': data
            })
        })
        .catch(error => {
            console.log(error.message)
            res.render('error')
        })
    })
})

router.post('/add',(req,res) => {
    req.getConnection((error,connect) => {
        customerController.add(connect,req.body)
        .then(() => {
            // console.log(data)
            res.render('success')
            // res.render('table',{
            //     'data':data
            // })
            // res.send('OK')
        })
        .catch(error => {
            console.log(error.message)
            res.render('error')
        })
    })
})

router.get('/update/:id',(req,res) => {
    req.getConnection((error,connect) => {
        customerController.update(connect,req.params.id)
            .then(data => {
                console.log(data);
                res.render('customer-edit',{
                    data:data[0]
                })
            })
            .catch(error => {
                console.log(error.message)
                res.render('error')
            })
    })
})
router.post('/update/:id',(req,res) => {
    req.getConnection((error,connect) => {
        customerController.insert(connect,req.params.id,req.body)
            .then(data => {
                res.render('update-success')
            })
            .catch(error => {
                console.log(error.message)
                res.render('error')
            })
    })
})
router.get('/remove/:id',(req,res) => {
    req.getConnection((error,connect) => {
        customerController.remove(connect,req.params.id)
            .then(() => {
                res.redirect('/userList')
            })
            .catch(error => {
                console.log(error.message)
                res.render('error')
            })
    })
})

module.exports = router