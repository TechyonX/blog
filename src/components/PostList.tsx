import React from "react";
import PostCard from "../components/PostCard";
import { Post } from "../utils/types";

export default function PostList({ posts }: { posts: [{ node: Post }] }) {
  return (
    <div className="grid-x grid-margin-x grid-margin-y">
      {posts.map((post: { node: Post }) => {
        return <PostCard post={post.node} key={post.node.strapiId} />;
      })}
    </div>
  );
}
