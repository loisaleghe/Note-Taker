//Dependencies
const http = require ('http')
const path = require("path");
const PORT = 3000
const express = require ('express')
let fs = require('fs')

const app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//ROUTES

//to return the notes.html
app.get('/notes', function(req,res){
    res.sendFile(path.join(__dirname + "/Develop/public/notes.html"))
})

//to return the index.html
app.get(`*`, function(req, res){
    res.sendFile(path.join(__dirname + "/Develop/public/index.html"))
})

//read the db.json file
app.get(`/api/notes`, function(req, res){
    fs.readFile('db.json', 'utf8', function(error, data){
        if (error) {
            return console.log(error)
          }
          return data.json()
    })
})

//write to db.json file
app.post(`/api/notes`, function(req, res){
    fs.writeFile('db.json',)
})

app.listen(PORT, () => console.log(`App is listening on PORT ${PORT}`))
