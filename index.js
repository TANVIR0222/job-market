import 'dotenv/config'
import connectDB from './src/db/index.js'
import app from './app.js';
import mongoose from 'mongoose';

connectDB()
.then(() => {
    app.on( "error" ,(error) => {
        console.log("Error", error);
        throw error;
    })
    // 
    app.listen(process.env.PORT || 8080, () =>
      console.log(`Server is running on port ${process.env.PORT}`)
    );
})
.catch((err) => console.log("Mongo DB connection failed:", err));




