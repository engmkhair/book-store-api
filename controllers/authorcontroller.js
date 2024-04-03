const asyncHandler=require("express-async-handler")
const { Author,validateCreateAuthor,validateUpdateAuthor } = require('../models/Author')


//get-post....
const getAuthors=asyncHandler(async(req,res)=>{
    const authorList=await Author.find() //.sort({firstName:-1}).select("firstName lastName -_id")
    res.status(200).json(authorList)
})
const getAuthorsById=asyncHandler(
    async(req,res)=>{
       const author=await Author.findById(req.params.id)
        if(author)
        res.status(200).json(author)
        else
        res.status(404).json({message:"author not found"})
    })
const createAuthor=asyncHandler(async (req,res)=>{
    
    const {error}=validateCreateAuthor(req.body)
    if(error)
    {
        return res.status(400).json({message:error.details[0].message})
    }
     
        try{
            const author= new Author({
                firstName:req.body.firstname,
                lastName:req.body.lastname,
                nathionality:req.body.nathionality
            })
            const result =await author.save()
             res.status(201).json(result)
        }catch(error){
            console.log(error)
            res.status(500).json({message:"something went wrong"})
        }
    })
const updateAuthor=asyncHandler(async(req,res)=>{
    const {error}=validateUpdateAuthor(req.body)
    if(error)
    {
        return res.status(400).json({message:error.details[0].message})
    }
    const author= await Author.findByIdAndUpdate(req.params.id,{
        $set:{
            firstName:req.body.firstname,
            lastName:req.body.lastname,
            nathionality:req.body.nathionality
        }
    },{new:true})
    res.status(200).json(author)
    })
const deleteAuthor=asyncHandler(async(req,res)=>{
 
    const author=await Author.findById(req.params.id) 
    if(author)
    {
        await Author.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"author has been deleted"})
    }else{
        res.status(404).json({message:"author not found"})
    }
    })
module.exports={getAuthors,getAuthorsById,createAuthor,updateAuthor,deleteAuthor}