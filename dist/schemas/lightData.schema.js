"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LightData = void 0;
const { Schema, model, ObjectId } = require('mongoose');
const LightDataSchema = new Schema({
    value: {
        type: String,
        default: '',
    },
    date: {
        type: Date,
        default: new Date(),
    },
});
exports.LightData = new model('LightData', LightDataSchema);
LightDataSchema.set('toJSON', {
    transform: (document, returnesObject) => {
        returnesObject.id = returnesObject._id;
        delete returnesObject._id;
        delete returnesObject.__v;
    },
});
//# sourceMappingURL=lightData.schema.js.map