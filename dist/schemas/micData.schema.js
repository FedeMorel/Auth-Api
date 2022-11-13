"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MicData = void 0;
const { Schema, model, ObjectId } = require('mongoose');
const micDataSchema = new Schema({
    value: {
        type: String,
        default: '',
    },
    date: {
        type: Date,
        default: new Date(),
    },
});
exports.MicData = new model('micData', micDataSchema);
micDataSchema.set('toJSON', {
    transform: (document, returnesObject) => {
        returnesObject.id = returnesObject._id;
        delete returnesObject._id;
        delete returnesObject.__v;
    },
});
//# sourceMappingURL=micData.schema.js.map