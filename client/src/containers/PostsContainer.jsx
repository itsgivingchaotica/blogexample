import React, { Suspense, lazy } from "react";
const PostsGrid = lazy(() => import("../layouts/PostsGrid"));

const PostsContainer = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PostsGrid />
    </Suspense>
  );
};

export default PostsContainer;
