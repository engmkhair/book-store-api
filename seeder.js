const {Book}=require("../book-store-api/models/Book")
const {books,authors}=require("../book-store-api/data")
const {Author}=require("../book-store-api/models/Author")
const connectToDB=require("../book-store-api/config/db")
require("dotenv").config()
 //connection to db
 connectToDB()
//import books
const importBooks=async()=>{
    try {
        await Book.insertMany(books)
        console.log("books imported")
    } catch (error) {
console.log(error)
process.exit(1)        
    }
}
//import Authors
const importAuthors=async()=>{
    try {
        await Author.insertMany(authors)
        console.log("authors imported")
    } catch (error) {
console.log(error)
process.exit(1)        
    }
}
//delete books
const deleteBooks=async()=>{
    try {
        await Book.deleteMany()
        console.log("books deleted")
    } catch (error) {
console.log(error)
process.exit(1)        
    }
}
if(process.argv[2] === "-import")
{
    importBooks()
} else if(process.argv[2]==="-remove")
{
    deleteBooks()
}else if(process.argv[2]==="-import-authors")
{
    importAuthors()
}