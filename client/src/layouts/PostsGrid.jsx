import React, { useState, useEffect } from "react";
import { Button, Grid, Stack } from "@mui/material";
import BlogPost from "../components/BlogPost";
import { useBlog } from "../context/BlogContextProvider"; // Adjust the import path as necessary

const PostsGrid = () => {
  const { posts, setLastUpdated } = useBlog();

  const handleViewAllPosts = () => {
    setLastUpdated(Date.now());
  };

  return (
    <Stack spacing={4}>
      <Grid container rowSpacing={4} columnSpacing={{ xs: 4 }}>
        {posts?.map((post) => (
          <Grid item xs={6} key={post.id}>
            <BlogPost post={post} />
          </Grid>
        ))}
      </Grid>
      {posts.length === 1 && (
        <Button
          variant="contained"
          color="secondary"
          onClick={handleViewAllPosts}
        >
          Return to Posts
        </Button>
      )}
    </Stack>
  );
};

export default PostsGrid;
