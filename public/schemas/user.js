"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
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
    address: {
        street: {
            type: String,
            required: true,
            maxlength: 50
        },
        location: {
            type: String,
            required: true,
            maxlength: 50
        },
        city: {
            type: String,
            required: true,
            maxlength: 50
        },
        country: {
            type: String,
            required: true,
            maxlength: 50
        },
        cp: {
            type: String,
            required: true,
            maxlength: 4,
            minLenght: 4
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
});
exports.User = (0, mongoose_1.model)('user', userSchema);
userSchema.set('toJSON', {
    transform: (document, returnesObject) => {
        returnesObject.id = returnesObject._id;
        delete returnesObject._id;
        delete returnesObject.__v;
    },
});
//# sourceMappingURL=user.js.map