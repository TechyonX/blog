import React from "react";
import { Link } from "gatsby";
import Img, { FluidObject } from "gatsby-image";

type Post = {
  strapiId: number;
  slug: string;
  title: string;
  image: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
};

export default function PostCard({ post }: { post: Post }) {
  return (
    <div className="cell small-6 large-6" style={{ border: "1px solid" }}>
      {post.image ? <Img fluid={post.image.childImageSharp.fluid} /> : null}
      <Link to={`/post/${post.slug}`}>{post.title}</Link>
    </div>
  );
}
