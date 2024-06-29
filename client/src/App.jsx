import { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import "./App.css";
import PostsContainer from "./layouts/PostsGrid.jsx";
import { BlogProvider } from "./context/BlogContextProvider.jsx";
import EditPostForm from "./components/EditPostForm.jsx";

const App = () => {
  const [isCreatingPost, setIsCreatingPost] = useState(false);

  const handleCreatePostClick = () => {
    setIsCreatingPost(true);
  };
  return (
    <BlogProvider>
      <div>
        <Box margin={4}>
          <h1>Blog Posts Demo</h1>
          {!isCreatingPost && (
            <Button
              variant="contained"
              color="secondary"
              sx={{
                "&:hover": {
                  backgroundColor: "green",
                },
              }}
              onClick={handleCreatePostClick}
            >
              Create a Post
            </Button>
          )}
        </Box>
        {isCreatingPost && (
          <EditPostForm
            post={{}}
            isCreatingPost={isCreatingPost}
            setIsCreatingPost={setIsCreatingPost}
          />
        )}
        <PostsContainer />
      </div>
    </BlogProvider>
  );
};

export default App;
