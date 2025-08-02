import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  POST_ID: {
    type: Number,
    required: true,
    unique: true,
  },
  HEADING: {
    type: String,
    required: true,
    trim: true,
  },
  BODY: {
    type: String,
    required: true,
    trim: true,
  },
  TAGS: {
    type: [String],
  },
  IMAGE: {
    type: String,
    default: "",
  },
  LIKES: {
    type: Number,
    default: 0,
  },
});

const PostModel = mongoose.models.Post || mongoose.model("Post", postSchema);
export default PostModel;
