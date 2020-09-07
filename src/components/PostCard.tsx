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
  image: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
};

export default function PostCard({ post }: { post: Post }) {
  return (
    <div className={`cell medium-6 large-4 ${style.postCard}`}>
      {post.image ? (
        <Link to={`/post/${post.slug}`}>
          <Img fluid={post.image.childImageSharp.fluid} />
        </Link>
      ) : null}
      <div className={style.postCardContent}>
        {post.tags.length > 0 ? (
          <Link
            to={`/tag/${post.tags[0].slug}`}
            className={`${style.postCardTag}`}
          >
            {post.tags[0].name}
          </Link>
        ) : null}
        <Link to={`/post/${post.slug}`}>
          <h4 className={style.postCardTitle}>{post.title}</h4>
          <p className={style.postCardExcerpt}>{post.excerpt}</p>
        </Link>
      </div>
    </div>
  );
}
