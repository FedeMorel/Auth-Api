import { IPost } from "../utils/IPost";
import mongoose, { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const postSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    maxLength: 100
  },
  description: {
    type: String,
    required: true,
    maxLength: 1000
  },
  creationDate: {
    type: Date,
    default: Date.now
  },
  modificationDate: {
    type: Date,
    default: Date.now
  },
  author: {
    name: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 15
    },
    userId: {
      type: String,
      required: true,
      maxlength: 24
    },
    role: {
      type: String,
      required: true
    }
  },
  state: {
    type: Boolean,
    default: true
  }
})

postSchema.plugin(mongoosePaginate);

interface PostDocument extends mongoose.Document, IPost { }

export const Post = model<PostDocument, mongoose.PaginateModel<PostDocument>>('post', postSchema);

postSchema.set('toJSON', {
  transform: (document: any, returnesObject: any) => {
    returnesObject.id = returnesObject._id;
    delete returnesObject._id;
    delete returnesObject.__v;
  },
});