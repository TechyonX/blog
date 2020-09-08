import React from "react";
import { Link } from "gatsby";
import Img, { FluidObject } from "gatsby-image";
import style from "./PostCard.module.scss";

type Post = {
  strapiId: number;
  slug: string;
  title: string;
  excerpt: string;
  publish_at: Date;
  tags: [{ id: number; slug: string; name: string }];
  author: { id: number; username: string; email: string; full_name: string };
  image: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
  childMdx: {
    timeToRead: number;
  };
};

export default function PostCard({ post }: { post: Post }) {
  return (
    <article className={`cell medium-6 large-4 ${style.postCard}`}>
      {post.image ? (
        <Link to={`/post/${post.slug}`} aria-label={post.title}>
          <Img
            fluid={post.image.childImageSharp.fluid}
            className={style.postCardImage}
          />
        </Link>
      ) : null}

      <Link to={`/post/${post.slug}`} aria-label={post.title}>
        <div className={style.postCardContent}>
          <p className={`${style.postCardTag}`}>
            {post.tags.length > 0 ? post.tags[0].name : null}
          </p>
          <h4 className={style.postCardTitle}>{post.title}</h4>
          <p className={style.postCardExcerpt}>{post.excerpt}</p>
        </div>
      </Link>
      <div className={style.postCardMeta}>
        <p className={style.postCardAuthor}>
          {post.author ? (
            <Link to={`/author/${post.author.username}`}>
              {post.author.full_name
                ? post.author.full_name
                : post.author.username}
            </Link>
          ) : (
            "Байхгүй"
          )}
        </p>
        <p className={style.postCardDate}>
          {post.publish_at} •{" "}
          {post.childMdx.timeToRead ? post.childMdx.timeToRead : 0} мин
        </p>
      </div>
    </article>
  );
}
