const mongoose=require("mongoose")
const joi=require('joi')

const BookSchema=new mongoose.Schema(
    {
        title:{
            type: String ,
            trim:true,
            required:true,
            minlength:3,
            maxlength:100,
        },
        auther:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"Author",
        },
        price:{
            type:Number,
            required:true,
            trim:true,
            min:0,
        },
        cover:{
            type:String,
            required:true,
            enum:["soft cover","hard cover"]
        },
    },{timestamps:true}
)

const Book=mongoose.model("Book",BookSchema)



//validate create book
function validateCreateBook(obj){
    const schema=joi.object({
        title:joi.string().trim().max(100).min(3).required(),
        author:joi.string().required(),
        price:joi.number.min(0).required().trim(),
        cover:joi.required().String().valid("soft cover","hard cover"),
        })
        
        return schema.validate(obj)
}

//validate update book
function validateUpdateBook(obj){
    const schema=joi.object({
        title:joi.string().trim().max(100).min(3),
        author:joi.string(),
        price:joi.number.min(0).required().trim(),
        cover:joi.required().String().valid("soft cover","hard cover"),
        })
        
        return schema.validate(obj)
}



module.exports={Book,validateCreateBook,validateUpdateBook}