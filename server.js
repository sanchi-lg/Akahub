const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const MONGO_URL = "mongodb://localhost/r"
const MONGODB_URL = "mongodb://127.0.0.1:27017/r"
const PORT = process.env.PORT || 9000
var fs = require('fs')
mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())


app.listen(PORT, () => {
    console.log(`working on ${PORT}`)

})

app.post("/login", (req, res) => {


    MongoClient.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, async function (err, client) {
        const db = client.db('akhub')
        var ob = []
        db.collection('employee').findOne({ "email": req.body.email, "password": req.body.password }, (err, data) => {



            if (err) {
                res.json({ "err": 1, "mssg": "something went wrong" })

            }
            else if (data == null) {
                res.json({ "err": 1, "mssg": "email or password not correct" })

            }
            else {
                res.json({ "err": 0, "mssg": "", "uid": { name: data.name, email: req.body.email } })


            }
        }
        )
    })
})


app.post("/signup", (req, res) => {


    MongoClient.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, async function (err, client) {
        const db = client.db('akhub')
        var ob = []

        db.collection('employee').findOne({ "email": req.body.email}, (err, data) => {



            if (err) {
                res.json({ "err": 1, "mssg": "something went wrong" })

            }
            else if (data == null) {
                db.collection('employee').insertOne({ "email": req.body.email, "password": req.body.password,"name":req.body.name ,"events":[]}, (err, data) => {



                    if (err) {
                        res.json({ "err": 1, "mssg": "something went wrong" })
        
                    }
                  
                    else {
                        res.json({ "err": 0})
        
        
                    }
                }
                )

            }
            else {
                res.json({ "err": 1, "mssg": "This email is already registered"})


            }
        }
        )

     
    })
})




app.post("/addevent/:id", async (req, res) => {
    let id = req.params.id
    console.log(id);
    let event = req.body.event
    let addDet = req.body.addDet


    MongoClient.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, async function (err, client) {
        const db = client.db('akhub')
        var ob = []
        db.collection('employee').updateOne({ "email": id }, { $push: { events: { event:event,addDet:addDet }}}, (err, data) => {
        
            if (err || data.modifiedCount == 0) {
                res.json({ err: 1, mssg: "something went wrong" })
            }
            else {
                res.json({ err: 0, mssg: "event is added successfully" })
            }
        }
        )


    })
})


    app.get("/events/:id", (req, res) => {

        let id = req.params.id

        MongoClient.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, async function (err, client) {
            const db = client.db('akhub')
            var ob = []
            db.collection('employee').findOne({ "email": id }, (err, data) => {
                res.json(data.events)
                
            })


        })

       

    })
