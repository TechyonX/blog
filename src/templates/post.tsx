import React from "react";
import Layout from "../components/Layout";
import { graphql } from "gatsby";
import Img, { FluidObject } from "gatsby-image";
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
  image: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
};

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
            <div
              dangerouslySetInnerHTML={{
                __html: data.post.childMarkdownRemark.html,
              }}
            ></div>
            {data.post.childMarkdownRemark.tableOfContents}
            <p>Time to read: {data.post.childMarkdownRemark.timeToRead}</p>
            <p>
              Paragraphs: {data.post.childMarkdownRemark.wordCount.paragraphs}
            </p>
            <p>
              Sentences: {data.post.childMarkdownRemark.wordCount.sentences}
            </p>
            <p>Words: {data.post.childMarkdownRemark.wordCount.words}</p>
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
