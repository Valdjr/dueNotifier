import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Product = new Schema({
    name: {
        type: String,
        required: true
    },
    due:{
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

mongoose.model('products', Product)