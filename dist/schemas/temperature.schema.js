"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Temperature = void 0;
const { Schema, model, ObjectId } = require('mongoose');
const temperatureDataSchema = new Schema({
    temperature: {
        type: String,
        default: '',
    },
    humidity: {
        type: String,
        default: '',
    },
    computeHeatIndex: {
        type: String,
        default: '',
    },
    date: {
        type: Date,
        default: new Date(),
    },
});
exports.Temperature = new model('temperatureData', temperatureDataSchema);
temperatureDataSchema.set('toJSON', {
    transform: (document, returnesObject) => {
        returnesObject.id = returnesObject._id;
        delete returnesObject._id;
        delete returnesObject.__v;
    },
});
//# sourceMappingURL=temperature.schema.js.map