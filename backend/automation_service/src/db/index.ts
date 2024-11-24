import mongoose from 'mongoose';
import { DB_NAME } from '../constants';

const connectDb = async () => {
    try {
        const connection = mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`🌏  MongooDB connected`)
        
    } catch (e) {
        console.log(`❌  Failed to connect to DynamoDB`)
        console.error(e)
    }
}

export { connectDb };