const {blog,watches,electronics,books,laptop,dummy}=require("./dummydata")

const blogController=(req,res)=>{
   return res.send(blog)
}
const electronicsController=(req,res)=>{
       return res.send(electronics)
   }
   const laptopController=(req,res)=>{
      return res.send(laptop)
  }
   const watchesController=(req,res)=>{
       return res.send(watches)
   }
 
  const booksController=(req,res)=>{
   return res.send(books)
}
const Success=(req,res)=>{
    return res.send("Success")
}
const dummyController=(req,res)=>{
    return res.send(dummy)
}
module.exports={blogController,electronicsController,booksController,watchesController,laptopController,dummyController,Success}