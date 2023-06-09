const mongoose = require('mongoose');
const connectDB = async () =>{
    try {
        mongoose.set('strictQuery',true);
        const conn = await mongoose.connect(process.env.DATABASE_URL,{
            useUnifiedTopology:true,
            useNewUrlParser:true
        });
        console.log(`Database is connected ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};
module.exports= connectDB;