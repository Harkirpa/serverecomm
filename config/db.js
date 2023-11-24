const cloudURL = "mongodb+srv://kirpa704:test1234@testingpro.37erh3v.mongodb.net/?retryWrites=true&w=majority";
const mongoose= require("mongoose")
mongoose.set("strictQuery", true)
const connection = async () => {
    try {
     const result= await mongoose.connect(cloudURL)
        console.log("Connected")
        // console.log(result)
    }
    catch (err) {
        console.log(err, "occured during connection with DB")
    }
}
module.exports = connection
// const mongoose=require("mongoose")
// const connectdb=(url)=>mongoose.connect(url)
//     .then(()=>console.log("mongoose is connected................."))
//     .catch((error)=>console.log(error))

// module.exports=connectdb


