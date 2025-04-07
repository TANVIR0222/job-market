import mongoose from "mongoose"

const connectDB = async() => {
    try {
        const connectionInstance = await mongoose.connect(process.env.BD_URL)
        console.log(`MongoDB Connected Database  !! DB Host ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log('Mongodb connection Failed : ', error);
        process.exit(1)
    }

}


export default connectDB