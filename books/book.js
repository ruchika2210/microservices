const express=require('express')
const  bodyparser=require('body-parser')
const app=express()
const mongoose=require('mongoose')
const stringify=require('stringify')

mongoose.model('Book',{
    title:{
        type:String,
        require:true
    },
    author:{
        type:String,
        require:true
    },
    numberpages:{
        type:Number,
        require:false
    },
    publisher:{
        type:String,
        require:false
    }  
})