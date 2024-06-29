import {
  fetchPosts,
  updatePost,
  createPost,
  deletePost,
  fetchOnePost,
} from "../db/queries.js";

class PostsController {
  // READ aka FETCH
  static async fetch(req, res) {
    try {
      const posts = await fetchPosts();
      // OK
      res.status(200).json({ posts, message: "Posts fetched successfully" });
    } catch (err) {
      res.status(404).json({ error: "Resource not found" }); // Not Found
    }
  }

  // UPDATE
  static async update(req, res) {
    try {
      const { id } = req.params;
      const { title, content } = req.body;

      // Check if at least one of title or content is provided
      if (!title && !content) {
        return res
          .status(400) // Bad Request
          .json({ error: "No update information provided" });
      }

      let updateObject = {};
      updateObject.title = title; //"something"
      updateObject.content = content; //"" or "somethingelse"

      await updatePost(id, updateObject);

      res
        .status(200) //OK
        .json({ message: `Post with id ${id} updated successfully` });
    } catch (err) {
      res.status(404).json({ error: `Post with id ${id} was not found` });
    }
  }

  //FETCH ONE
  static async fetchOne(req, res) {
    try {
      const { id } = req.params;
      const post = await fetchOnePost(id);
      if (post) {
        res.status(200).json({ post, message: "Post fetched successfully" });
      } else {
        res.status(404).json({ error: `Post with id ${id} not found` });
      }
    } catch (err) {
      res.status(404).json({ error: `Post with id ${id} not found` });
    }
  }

  // CREATE
  static async create(req, res) {
    const { title, content } = req.body;

    if (!title || !content) {
      // Bad Request
      return res.status(400).json({ error: "Title and content are required" });
    }

    try {
      const newPost = await createPost({ title, content });
      res
        .status(201)
        .json({ data: newPost, message: "Post created successfully" });
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // DELETE
  static async delete(req, res) {
    try {
      const { id } = req.params;
      await deletePost(id);
      // No Content
      res.status(204).json({ message: "No content, post deleted succesfully" });
    } catch (err) {
      // Not Found
      res.status(404).json({ error: `Post with id ${id} not found` });
    }
  }
}

export default PostsController;
