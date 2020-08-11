import React from "react";
import Layout from "../components/Layout";
import { graphql } from "gatsby";
import Img, { FluidObject } from "gatsby-image";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";

type Post = {
  strapiId: number;
  slug: string;
  title: string;
  created_at: Date;
  content: string;
  status: string;
  childMdx: {
    body: string;
    tableOfContents: {
      items: [{ url: string; title: string }];
    };
    timeToRead: number;
    wordCount: {
      paragraphs: number;
      sentences: number;
      words: number;
    };
  };
  image: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
};

function TestComponent() {
  return <code>Hello World!</code>;
}

export default function Post({ data }: { data: { post: Post } }) {
  const toc = data.post.childMdx.tableOfContents;
  return (
    <Layout>
      <main className="grid-container">
        <div className="grid-x">
          <div className="cell auto">
            <p>{data.post.created_at}</p>
            <h1>{data.post.title}</h1>
            {data.post.image ? (
              <Img fluid={data.post.image.childImageSharp.fluid} />
            ) : null}
            {toc.items !== undefined ? (
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
              <MDXRenderer>{data.post.childMdx.body}</MDXRenderer>
            </MDXProvider>
            <p>Time to read: {data.post.childMdx.timeToRead}</p>
            <p>Paragraphs: {data.post.childMdx.wordCount.paragraphs}</p>
            <p>Sentences: {data.post.childMdx.wordCount.sentences}</p>
            <p>Words: {data.post.childMdx.wordCount.words}</p>
            <p>{data.post.status}</p>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export const query = graphql`
  query Post($slug: String!) {
    post(slug: { eq: $slug }) {
      strapiId
      title
      excerpt
      content
      status
      childMdx {
        body
        tableOfContents
        timeToRead
        wordCount {
          paragraphs
          sentences
          words
        }
      }
      image {
        childImageSharp {
          fluid(maxWidth: 960) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      created_at(formatString: "YYYY-MM-DD")
    }
  }
`;
