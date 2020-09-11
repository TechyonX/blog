import React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";
import style from "./PostCard.module.scss";
import { Post } from "../utils/types";

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link
      to={`/post/${post.slug}`}
      aria-label={post.title}
      className={`cell medium-6 large-4 ${style.postCard}`}
    >
      {post.image ? (
        <Img
          fluid={post.image.childImageSharp.fluid}
          className={style.postCardImage}
        />
      ) : null}

      <div className={style.postCardContent}>
        <p className={`${style.postCardTag}`}>
          {post.tags.length > 0 ? post.tags[0].name : null}
        </p>
        <h4 className={style.postCardTitle}>{post.title}</h4>
        <p className={style.postCardExcerpt}>{post.excerpt}</p>
      </div>
      <div className={style.postCardMeta}>
        <p className={style.postCardAuthor}>
          {post.author
            ? post.author.full_name
              ? post.author.full_name
              : post.author.username
            : "Байхгүй"}
        </p>
        <p className={style.postCardDate}>
          {post.publish_at} •{" "}
          {post.childMdx.timeToRead ? post.childMdx.timeToRead : 0} мин
        </p>
      </div>
    </Link>
  );
}
