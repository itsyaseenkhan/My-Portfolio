import mongoose from "mongoose";

const DbConnect = () =>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName: "PORTFOLIOO",
    })
    .then(() =>{
        console.log("Connect to database")
    })
    .catch((error) =>{
        console.log("Not Connection to Database now ")
    });

}
export default DbConnect;