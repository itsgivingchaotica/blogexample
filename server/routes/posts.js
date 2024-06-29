import express from "express";
import PostsController from "../controllers/posts.js";

const router = express.Router();

router.get("/", PostsController.fetch);
router.get("/:id", PostsController.fetchOne);
router.patch("/:id", PostsController.update);
router.post("/", PostsController.create);
router.delete("/:id", PostsController.delete);

export default router;
