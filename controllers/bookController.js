const  ascyncHandler= require("express-async-handler")
const {Book,validateCreateBook,validateUpdateBook}=require('../models/Book')


const getAllBooks=ascyncHandler(async(req,res)=>{
    const{minPrice,maxPrice}=req.query
    let books
    if(minPrice && maxPrice){
        books=await Book.find({price:{$gte:minPrice,$lte:maxPrice}})
        .populate("author",["_id","firstName","lastName"])
    } else {books=await Book.find().populate("author",["_id","firstName","lastName"])}
            res.status(200).json(books)
        })

const getBookById=ascyncHandler(async(req,res)=>{
    const book=await Book.findById(req.params.id).populate("author")
     if(book)
     res.status(200).json(book)
     else
     res.status(404).json({message:"book not found"})
 })
 const createBook=ascyncHandler(async(req,res)=>{
        
    const {error}=validateCreateBook(req.body)
    if(error)
    {
        return res.status(400).json({message:error.details[0].message})
    }
     
        const book=new Book({
           
            title:req.body.title,
            author:req.body.author,
            price:req.body.price,
            cover:req.body.cover,
        })
    const result=await book.save()
        // books.push(book)
         res.status(201).json(result)
    })
    const updateBook=ascyncHandler(async(req,res)=>{
        const {error}=validateUpdateBook(req.body)
        if(error)
        {
            return res.status(400).json({message:error.details[0].message})
        }
        const updateBook=Book.findByIdAndUpdate(req.params.id,
        {
            $set:{
                title:req.body.title,
                author:req.body.author,
                price:req.body.price,
                cover:req.body.cover
            },
        },{new:true} )
        res.status(200).json(updateBook)
       
    })
    const deleteBook=ascyncHandler(async(req,res)=>{
     
        const book=await Book.findById(req.params.id) 
        if(book)
        {
            await Book.findByIdAndDelete(req.params.id)
            res.status(200).json({message:"book has been deleted"})
        }else{
            res.status(404).json({message:"book not found"})
        }
    })
        module.exports={getAllBooks,getBookById,createBook,updateBook,deleteBook}