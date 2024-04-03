const mongoose=require("mongoose")

async function connectToDB() {

try {
   await  mongoose.connect(process.env.MONGO_URI)
    console.log("connect to DB")
} catch (error) {
    console.log("connection faild to DB",error)
}

//     mongoose.connect(process.env.MONGO_URI)
// .then(()=>{console.log("connect to DB")})
// .catch((error)=>{console.log("connection faild to DB",error)})
 }
 module.exports=connectToDB