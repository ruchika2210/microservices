const express=require("express");
const bodyParser=require("body-parser");
const app=express();
const mongoose = require('mongoose');

app.use(bodyParser.json())
require('./book')

const Book=mongoose.model("Book")
mongoose.connect("mongodb://localhost:27017/booksservice", {useNewUrlParser: true,useUnifiedTopology:true},()=>{
    console.log("database connected");
});

app.get('/',async (req,res) =>{
    try {
        await Book.find().then((books) =>{
            res.json(books)
        })    
    } catch (error) {
        console.log(error)
        
    }
    
})

app.post('/book',(req,res) =>{
    var newBook={

        title:req.body.title,
        author:req.body.author,
        numberPages:req.body.numberPages,
        publisher:req.body.publisher
    }
    var book=new Book(newBook)

    book.save().then(()=>{
        console.log("New Book Created!")
    }).catch((err)=>{
        if(err){
            throw err;
        }
    });
    res.send("Take this as a response");
});

app.get('/books/:id',(req,res)=>{
    Book.findById(req.params.id).then((books)=>{
        if(books){
            res.json(books);
        }else{
            res.send(404);
        }

    }).catch((err)=>{
        if(err){
            throw err;
        }
    });
});



app.listen(4000,function(){
    console.log("server started");
});
