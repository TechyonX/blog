import React from "react";
import PostComponent from "../components/Post";
import { graphql } from "gatsby";
import { FluidObject } from "gatsby-image";

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
    wordCount: {
      paragraphs: number;
      sentences: number;
      words: number;
    };
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

export default function Post({ data }: { data: { post: Post } }) {
  return <PostComponent post={data.post} />;
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
      }
      image {
        childImageSharp {
          fluid(maxWidth: 960) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      author {
        id
        username
        email
        full_name
      }
      tags {
        id
        name
        slug
      }
      publish_at(formatString: "YYYY/MM/DD")
    }
  }
`;
