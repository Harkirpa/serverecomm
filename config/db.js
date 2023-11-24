const cloudURL = `mongodb+srv://Inayat:test1234@testingpro.37erh3v.mongodb.net/?retryWrites=true&w=majority`;
const mongoose= require("mongoose")
// mongoose.set("strictQuery", true)
// const connection = async () => {
//     try {
//     await mongoose.connect(cloudURL)
//         console.log("Connected")
//         // console.log(result)
//     }
//     catch (err) {
//         console.log(err, "occured during connection with DB")
//     }
// }
// module.exports = connection
function connectdb(){
    try{
 mongoose.connect(cloudURL, { useNewUrlParser: true })
 console.log("Connected to database")
    }
    catch(err) {
        console.log(err, "occured during connection with DB")
    }
}
module.exports=connectdb


