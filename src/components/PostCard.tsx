import React from "react";
import { Link } from "gatsby";
import Img, { FluidObject } from "gatsby-image";
import style from "./PostCard.module.scss";

type Post = {
  strapiId: number;
  slug: string;
  title: string;
  excerpt: string;
  tags: [{ id: number; slug: string; name: string }];
  author: { id: number; username: string; email: string; full_name: string };
  image: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
};

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link
      to={`/post/${post.slug}`}
      aria-label={post.title}
      className={`cell medium-6 large-4 ${style.postCard}`}
    >
      {post.image ? <Img fluid={post.image.childImageSharp.fluid} /> : null}
      <div className={style.postCardContent}>
        <p className={`${style.postCardTag}`}>
          {post.tags.length > 0 ? post.tags[0].name : null}
        </p>
        <h4 className={style.postCardTitle}>{post.title}</h4>
        <p className={style.postCardExcerpt}>{post.excerpt}</p>
      </div>
    </Link>
  );
}
