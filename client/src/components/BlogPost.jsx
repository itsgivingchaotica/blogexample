import React from "react";
import { Box, Button, Card, CardContent } from "@mui/material";
import EditPostForm from "./EditPostForm";
import { useBlog } from "../context/BlogContextProvider";
import axios from "axios";

const BlogPost = ({ post }) => {
  const { editingPostId, setEditingPostId, setLastUpdated, setPosts } =
    useBlog();
  const handleNewEdit = (id) => {
    setEditingPostId(id);
  };

  const handleViewPost = async (id) => {
    await axios
      .get(`http://localhost:3000/api/posts/${id}`)
      .then((res) => {
        setPosts(res.data.post);
      })
      .catch((err) => console.error("Error fetching posts:", err));
  };
  const isCurrentPostEditing = editingPostId === post.id;

  const deletePost = async (e, postId) => {
    await axios
      .delete(`http://localhost:3000/api/posts/${postId}`)
      .then((res) => {
        setLastUpdated(Date.now());
      });
  };
  return (
    <div>
      <Card key={post.id}>
        <Box display="flex" justifyContent="flex-end" margin={4}>
          {!isCurrentPostEditing && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleNewEdit(post.id)}
            >
              Edit
            </Button>
          )}
          <Button
            variant="contained"
            sx={{
              marginLeft: 2,
              backgroundColor: "#ff0000",
              "&:hover": { backgroundColor: "#cc0000" },
            }}
            onClick={(e) => deletePost(e, post.id)}
          >
            Delete
          </Button>
        </Box>
        {isCurrentPostEditing ? (
          <EditPostForm post={post} />
        ) : (
          <div onClick={() => handleViewPost(post.id)}>
            <h2>{post.title}</h2>
            <CardContent>{post.content}</CardContent>
          </div>
        )}
      </Card>
    </div>
  );
};

export default BlogPost;
