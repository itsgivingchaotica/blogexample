import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios"; // Import axios

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [editingPostId, setEditingPostId] = useState(false);
  const [posts, setPosts] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(Date.now());

  const handleEditPost = async (id, formData) => {
    await axios
      .patch(`http://localhost:3000/api/posts/${id}`, formData)
      .then((res) => {
        setLastUpdated(Date.now());
      });
  };

  useEffect(() => {
    if (!lastUpdated) return;
    axios
      .get(`http://localhost:3000/api/posts`)
      .then((response) => {
        setPosts(response.data.posts);
        console.log(response.data.posts);
      })
      .catch((err) => console.error("Error fetching posts:", err));
  }, [setPosts, lastUpdated]);

  return (
    <BlogContext.Provider
      value={{
        editingPostId,
        setEditingPostId,
        handleEditPost,
        posts,
        setPosts,
        lastUpdated,
        setLastUpdated,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  return useContext(BlogContext);
};
