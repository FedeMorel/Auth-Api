import mongoose, { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"
import { IUser } from "../utils/IUser";

const userSchema: Schema = new Schema({
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
})

userSchema.plugin(mongoosePaginate);

interface UserDocument extends mongoose.Document, IUser { }

export const User = model<UserDocument, mongoose.PaginateModel<UserDocument>>('user', userSchema);

userSchema.set('toJSON', {
  transform: (document: any, returnesObject: any) => {
    returnesObject.id = returnesObject._id;
    delete returnesObject._id;
    delete returnesObject.__v;
  },
});