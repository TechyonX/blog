import React from "react";
import Layout from "../components/Layout";
import { Link } from "gatsby";
import Img, { FluidObject } from "gatsby-image";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import style from "./Post.module.scss";

type Post = {
  strapiId: number;
  slug: string;
  title: string;
  excerpt: string;
  publish_at: Date;
  content: string;
  status: string;
  childMdx: {
    body: string;
    tableOfContents: {
      items: [{ url: string; title: string }];
    };
    timeToRead: number;
  };
  author: {
    id: number;
    username: string;
    email: string;
    full_name: string;
  };
  tags: [{ id: number; name: string; slug: string }];
  image: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
};

function TestComponent() {
  return <code>Hello World!</code>;
}

function PostHeader({ post }: { post: Post }) {
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

export default function Post({ post }: { post: Post }) {
  const toc = post.childMdx.tableOfContents;
  return (
    <Layout>
      <main className="grid-container">
        <div className="grid-x">
          <div className="cell auto">
            <PostHeader post={post} />
            {Object.keys(toc).length > 0 ? (
              <ul>
                {toc.items.map(i => (
                  <li key={i.url}>
                    <a href={i.url} key={i.url}>
                      {i.title}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
            <MDXProvider components={{ TestComponent }}>
              <MDXRenderer>{post.childMdx.body}</MDXRenderer>
            </MDXProvider>
          </div>
        </div>
      </main>
    </Layout>
  );
}
