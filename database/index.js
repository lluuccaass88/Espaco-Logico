const mongoose = require('mongoose')

let objDatabase = {
    connectDatabase: () =>{
  
        mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        })

        mongoose.Promise = global.Promise;

        const db = mongoose.connection;

        db.on("error", (error)=>{
            console.log(error);
        })
        db.once("open", ()=>{
            console.log("Connected to the Mongo");
        })
    },
    mongoose: mongoose
}



module.exports = objDatabase;