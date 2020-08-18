import React from "react";
import Layout from "../components/Layout";
import { FluidObject } from "gatsby-image";
import { graphql } from "gatsby";
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
        </div>
      </main>
    </Layout>
  );
}

export const query = graphql`
  query postAndTag($slug: String!) {
    allStrapiPost(filter: { tags: { elemMatch: { slug: { eq: $slug } } } }) {
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
    strapiTag(slug: { eq: $slug }) {
      strapiId
      name
    }
  }
`;
