"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GasData = void 0;
const { Schema, model, ObjectId } = require('mongoose');
const gasDataSchema = new Schema({
    value: {
        type: String,
        default: '',
    },
    date: {
        type: Date,
        default: new Date(),
    },
});
exports.GasData = new model('gasData', gasDataSchema);
gasDataSchema.set('toJSON', {
    transform: (document, returnesObject) => {
        returnesObject.id = returnesObject._id;
        delete returnesObject._id;
        delete returnesObject.__v;
    },
});
//# sourceMappingURL=gasData.schema.js.map