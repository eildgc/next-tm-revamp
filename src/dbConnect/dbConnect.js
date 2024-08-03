import mongoose from "mongoose";

// 0 validation
if (!process.env.MONGODB_URI) {
    throw new Error("Please add your MONGODB_URI to env");
}

const MONGODB_URI = process.env.MONGODB_URI;

//1 Type definition for mongoose in global scope
let globalWithMongoose = global;

//2 Caching mongoose instance
let cached = globalWithMongoose.mongoose;
if (!cached) {
    cached = globalWithMongoose.mongoose = { conn: null, promise: null };
}

//3 Database Connection function
export default async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose;
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}