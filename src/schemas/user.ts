import { model, Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    date: {
        type: Date,
        default: Date.now
    }
})


export const User = model('user', userSchema);

userSchema.set('toJSON', {
    transform: (document: any, returnesObject: any) => {
        returnesObject.id = returnesObject._id;
        delete returnesObject._id;
        delete returnesObject.__v;
    },
});
