import React from "react";
import Layout from "../components/Layout";
import { FluidObject } from "gatsby-image";
import { graphql } from "gatsby";
import PostCard from "../components/PostCard";

type Post = {
  strapiId: number;
  slug: string;
  title: string;
  excerpt: string;
  publish_at: Date;
  childMdx: { timeToRead: number };
  tags: [{ id: number; slug: string; name: string }];
  author: { id: number; username: string; email: string; full_name: string };
  image: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
};

type Tag = {
  strapiId: number;
  slug: string;
  name: string;
};

export default function Home({
  data,
}: {
  data: {
    allPost: {
      edges: [
        {
          node: Post;
        }
      ];
    };
    allStrapiTag: {
      edges: [
        {
          node: Tag;
        }
      ];
    };
  };
}) {
  return (
    <Layout seoProps={{ title: "Нүүр хуудас" }}>
      <main className="grid-container">
        <div className="grid-x grid-margin-x grid-margin-y">
          {data.allPost.edges.map((post: { node: Post }) => {
            return <PostCard post={post.node} key={post.node.strapiId} />;
          })}
        </div>
      </main>
    </Layout>
  );
}

export const query = graphql`
  query {
    allPost(sort: { fields: publish_at, order: DESC }) {
      edges {
        node {
          strapiId
          title
          excerpt
          slug
          publish_at(formatString: "YYYY/MM/DD")
          tags {
            id
            name
            slug
          }
          childMdx {
            timeToRead
          }
          author {
            username
            id
            email
            full_name
          }
          image {
            childImageSharp {
              fluid(maxWidth: 480) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
    allStrapiTag {
      edges {
        node {
          strapiId
          name
          slug
        }
      }
    }
  }
`;
