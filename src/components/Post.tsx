import React, { useRef } from "react";
import Layout from "../components/Layout";
import { Link } from "gatsby";
import Img from "gatsby-image";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import style from "./Post.module.scss";
import { Post as PostType } from "../utils/types";
import ReadingProgress from "./ReadingProgress";

function TestComponent() {
  return <code>Hello World!</code>;
}

function PostHeader({ post }: { post: PostType }) {
  return (
    <div className={style.postHeader}>
      <div className={style.postInfo}>
        <p className={style.postTag}>
          {post.tags.length > 0 ? (
            <Link to={`/tag/${post.tags[0].slug}`}>{post.tags[0].name}</Link>
          ) : null}
        </p>
        <h1 className={style.postTitle}>{post.title}</h1>
        <p className={style.postExcerpt}>{post.excerpt}</p>
        <hr />
        <p className={style.postAuthor}>
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
        <p className={style.postDateAndTimeToRead}>
          {post.publish_at} •{" "}
          {post.childMdx.timeToRead ? post.childMdx.timeToRead : 0} мин
        </p>
      </div>
      {post.image !== null ? (
        <Img fluid={post.image.childImageSharp.fluid} />
      ) : null}
    </div>
  );
}

function PostSection({ post }: { post: PostType }) {
  const target = useRef();
  return (
    <article className="cell auto" ref={target}>
      <ReadingProgress target={target} />
      <PostHeader post={post} />
      <section className={style.postContent}>
        <MDXProvider components={{ TestComponent }}>
          <MDXRenderer>{post.childMdx.body}</MDXRenderer>
        </MDXProvider>
      </section>
    </article>
  );
}

export default function Post({ post }: { post: PostType }) {
  return (
    <Layout
      seoProps={{
        type: "article",
        title: post.title,
        desc: post.excerpt,
        image:
          post.image !== null
            ? {
                url: post.image.childImageSharp.fixed.src,
                height: post.image.childImageSharp.fixed.height,
                width: post.image.childImageSharp.fixed.width,
              }
            : null,
      }}
    >
      <main className="grid-container">
        <div className="grid-x">
          <PostSection post={post} />
        </div>
      </main>
    </Layout>
  );
}
