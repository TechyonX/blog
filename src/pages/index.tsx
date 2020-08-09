import React from "react";
import Layout from "../components/Layout";
import { FluidObject } from "gatsby-image";
import { Link, graphql } from "gatsby";
import PostCard from "../components/PostCard";

type Post = {
  strapiId: number;
  slug: string;
  title: string;
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
    allStrapiPost: {
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
        <div className="cell shrink">
          <h1>Тавтай морил!</h1>
          <h3>Нийтлэлүүд:</h3>
          <div className="grid-x">
            {data.allStrapiPost.edges.map((post: { node: Post }) => {
              return <PostCard post={post.node} key={post.node.strapiId} />;
            })}
          </div>

          <h3>Төрлүүд:</h3>
          <ul>
            {data.allStrapiTag.edges.map((tag: { node: Tag }) => {
              return (
                <li key={tag.node.strapiId}>
                  <Link to={`/tag/${tag.node.slug}`}>{tag.node.name}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </main>
    </Layout>
  );
}

export const query = graphql`
  query {
    allStrapiPost {
      edges {
        node {
          strapiId
          title
          slug
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
        }
      }
    }
  }
`;
