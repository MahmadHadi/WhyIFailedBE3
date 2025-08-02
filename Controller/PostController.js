import PostModel from "../Models/PostModel.js";

const createPost = async (req, res) => {
  try {
    const { HEADING, BODY, POST_ID } = req.body;

    if (!HEADING || !BODY || !POST_ID) {
      return res.status(400).json({
        success: false,
        message: "POST ID, HEADING and BODY are required fields",
      });
    }

    const post = new PostModel(req.body);

    await post.save();
    res
      .status(201)
      .json({ success: true, message: "Post created successfully", post });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const listPosts = async (req, res) => {
  try {
    const posts = await PostModel.find();
    res.status(200).json({ success: true, posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { HEADING, BODY } = req.body;

    if (!HEADING || !BODY) {
      return res.status(400).json({
        success: false,
        message: "HEADING and BODY are required fields",
      });
    }

    const post = await PostModel.findOneAndUpdate({ POST_ID: id }, req.body, {
      new: true,
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res
      .status(200)
      .json({ success: true, message: "Post updated successfully", post });
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await PostModel.findOneAndDelete({ POST_ID: id });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res
      .status(200)
      .json({ success: true, message: "Post deleted successfully", post });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const singlePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await PostModel.findOne({ POST_ID: id });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({ success: true, post });
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const likePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await PostModel.findOneAndUpdate({ POST_ID: id });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    post.LIKES += 1;
    await post.save();

    res.status(200).json({ success: true, message: "Post liked", post });
  } catch (error) {
    console.error("Error liking post:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export { createPost, listPosts, updatePost, deletePost, singlePost, likePost };
