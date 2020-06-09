//Dependencies
const http = require ('http')
const path = require("path");
const PORT = 3000
const express = require ('express')
let fs = require('fs')
const db = require("./db/db.json")

const app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//static contemt for the app from the public directory
app.use(express.static("public"));

//to return the notes.html
app.get('/notes', function(req,res){
    res.sendFile(path.join(__dirname + "/public/notes.html"))
})

app.get('/api/notes', function(req,res){
   res.json(db);
})

//write to db.json file
app.post('/api/notes', async(req, res) =>{
    db.push(req.body);
    
    console.log(db)
     fs.writeFile("./db/db.json", JSON.stringify(db), function(error){
        if (error){
            return console.log(error)
        }
        
        console.log("success");
        res.json(db);
    })


})

//to return the index.html
app.get('*', function(req, res){
    res.sendFile(path.join(__dirname + "/public/index.html"))
})





app.listen(PORT, () => console.log(`App is listening on PORT ${PORT}`))
