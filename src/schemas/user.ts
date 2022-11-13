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
})


export const User = model('user', userSchema);

userSchema.set('toJSON', {
  transform: (document: any, returnesObject: any) => {
    returnesObject.id = returnesObject._id;
    delete returnesObject._id;
    delete returnesObject.__v;
  },
});
