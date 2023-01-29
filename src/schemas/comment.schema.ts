import mongoose, { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"
import { IComment } from "../utils/IComment";

const commentSchema: Schema = new Schema({
  idPost: {
    type: String,
    required: true,
    maxLength: 24
  },
  creationDate: {
    type: Date,
    default: Date.now
  },
  comment: {
    type: String,
    required: true,
    maxLength: 500
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

commentSchema.plugin(mongoosePaginate);

interface CommentDocument extends mongoose.Document, IComment { }

export const Comment = model<CommentDocument, mongoose.PaginateModel<CommentDocument>>('comment', commentSchema);

commentSchema.set('toJSON', {
  transform: (document: any, returnesObject: any) => {
    returnesObject.id = returnesObject._id;
    delete returnesObject._id;
    delete returnesObject.__v;
  },
});