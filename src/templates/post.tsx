import React from "react";
import PostComponent from "../components/Post";
import { graphql } from "gatsby";
import { Post as PostType } from "../utils/types";

export default function Post({ data }: { data: { post: PostType } }) {
  return <PostComponent post={data.post} />;
}

export const query = graphql`
  query Post($slug: String!) {
    post(slug: { eq: $slug }) {
      ...postFieldsBigImage
    }
  }
`;
