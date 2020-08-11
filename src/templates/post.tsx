import React from "react";
import Layout from "../components/Layout";
import { graphql } from "gatsby";
import Img, { FluidObject } from "gatsby-image";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
// import ReactMarkdown from "react-markdown";

type Post = {
  strapiId: number;
  slug: string;
  title: string;
  created_at: Date;
  content: string;
  status: string;
  childMarkdownRemark: {
    html: string;
    tableOfContents: string;
    timeToRead: number;
    wordCount: {
      paragraphs: number;
      sentences: number;
      words: number;
    };
  };
  childMdx: {
    body: string;
    tableOfContents: string;
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
            {/* <ReactMarkdown source={data.post.content} /> */}
            {/* <div
              dangerouslySetInnerHTML={{
                __html: data.post.childMarkdownRemark.html,
              }}
            ></div> */}
            <MDXProvider components={{ TestComponent }}>
              <MDXRenderer>{data.post.childMdx.body}</MDXRenderer>
            </MDXProvider>
            {/* {data.post.childMarkdownRemark.tableOfContents} */}
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
      childMarkdownRemark {
        html
        tableOfContents
        timeToRead
        wordCount {
          paragraphs
          sentences
          words
        }
      }
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
