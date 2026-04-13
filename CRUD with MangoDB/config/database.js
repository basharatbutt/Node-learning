import mongoose from 'mongoose';

 export const connectDB = () => {

// 1. Database connection
mongoose.connect('mongodb://127.0.0.1:27017/contact-crud')
    .then(() => console.log('Database connected'))
    .catch(err => console.log("Connection Error: ", err));
    };
