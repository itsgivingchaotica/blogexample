import React, { useEffect, useState } from "react";
import { useBlog } from "../context/BlogContextProvider";
import { Box, Button, Stack, TextField } from "@mui/material";
import axios from "axios";

const EditPostForm = ({ post, isCreatingPost, setIsCreatingPost }) => {
  const { setEditingPostId, handleEditPost, setLastUpdated } = useBlog();
  const [formData, setFormData] = useState({
    title: post.title || "",
    content: post.content || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (post.id) {
      handleEditPost(post.id, formData);
      setEditingPostId(null);
      setLastUpdated(Date.now());
    } else {
      try {
        axios.post("http://localhost:3000/api/posts/", formData).then(() => {
          setIsCreatingPost(false);
          setLastUpdated(Date.now());
        });
      } catch {
        console.log("Error creating post");
      }
    }
  };

  const handleCancelEditPost = (e) => {
    e.preventDefault();
    setFormData({
      title: post.title,
      content: post.content,
    });
    if (isCreatingPost) {
      setIsCreatingPost(false);
    }
    setEditingPostId(null);
  };

  useEffect(() => {
    if (!post.id) {
      // Reset form if it's for creating a new post
      setFormData({ title: "", content: "" });
    }
  }, [post]);

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ margin: "2rem" }}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          width="100%"
        >
          <TextField
            name="title"
            label="Title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
            sx={{ backgroundColor: "white" }}
          />
          <TextField
            name="content"
            label="Content"
            value={formData.content}
            onChange={handleChange}
            multiline
            fullWidth
            margin="normal"
            sx={{ backgroundColor: "white" }}
          />
          <Box margin={2}>
            <Stack direction="row" spacing={2}>
              {!isCreatingPost ? (
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{
                    "&:hover": {
                      backgroundColor: "green",
                    },
                  }}
                >
                  Update Post
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  sx={{
                    "&:hover": {
                      backgroundColor: "green",
                    },
                  }}
                >
                  Create Post
                </Button>
              )}
              <Button
                type="submit"
                variant="contained"
                color="error"
                onClick={handleCancelEditPost}
              >
                Cancel
              </Button>
            </Stack>
          </Box>
        </Box>
      </form>
    </div>
  );
};

export default EditPostForm;
