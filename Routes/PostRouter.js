import express from "express";
import {
  createPost,
  listPosts,
  updatePost,
  deletePost,
  singlePost,
  likePost,
} from "../Controller/PostController.js";

const PostRouter = express.Router();

PostRouter.post("/create", createPost);
PostRouter.get("/list", listPosts);
PostRouter.get("/:id", singlePost);
PostRouter.put("/update/:id", updatePost);
PostRouter.delete("/delete/:id", deletePost);
PostRouter.put("/like/:id", likePost);

export default PostRouter;