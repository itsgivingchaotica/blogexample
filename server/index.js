import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import postsRouter from "./routes/posts.js";
const app = express();
const PORT = process.env.PORT || 3000;
const apiRouter = express.Router();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});
//base route
app.use("/api", apiRouter);

//posts route
apiRouter.use("/posts", postsRouter);

//user route

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
