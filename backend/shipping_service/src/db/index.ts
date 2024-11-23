import mongoose from 'mongoose';
import { DB_NAME } from '../constants';

const connectDb = async () => {
    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`🌏  MongoDB connected`)
        
    } catch (e) {
        console.log(`❌  Failed to connect to MongoDB`)
        console.error(e)

        throw(e)
    }
}

export { connectDb };