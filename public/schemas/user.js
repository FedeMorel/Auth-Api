"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 15
    },
    mail: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 50
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxLength: 300
    },
    address: {
        street: {
            type: String,
            maxlength: 50,
            default: ""
        },
        location: {
            type: String,
            maxlength: 50,
            default: ""
        },
        city: {
            type: String,
            maxlength: 50,
            default: ""
        },
        country: {
            type: String,
            maxlength: 50,
            default: ""
        },
        cp: {
            type: String,
            maxlength: 4,
            default: ""
        },
    },
    birthday: {
        type: Date,
        default: null
    },
    phone: {
        type: String,
        maxlength: 15,
        default: ""
    },
    state: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        default: "user"
    },
    date: {
        type: Date,
        default: Date.now
    }
});
userSchema.plugin(mongoose_paginate_v2_1.default);
exports.User = (0, mongoose_1.model)('user', userSchema);
userSchema.set('toJSON', {
    transform: (document, returnesObject) => {
        returnesObject.id = returnesObject._id;
        delete returnesObject._id;
        delete returnesObject.__v;
    },
});
//# sourceMappingURL=user.js.map