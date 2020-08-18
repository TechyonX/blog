import React from "react";
import Layout from "../components/Layout";
import { FluidObject } from "gatsby-image";
import { graphql } from "gatsby";
import PostCard from "../components/PostCard";

type Post = {
  id: number;
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
  posts: [Post];
};

export default function Tag({
  data,
}: {
  data: {
    strapiTag: Tag;
  };
}) {
  return (
    <Layout seoProps={{ title: "Нүүр хуудас" }}>
      <main className="grid-container">
        <div className="cell shrink">
          <h1>Тавтай морил!</h1>
          <p>Tag: {data.strapiTag.name}</p>
          <h3>Нийтлэлүүд: {data.strapiTag.posts.length}</h3>
          <div className="grid-x">
            {data.strapiTag.posts.map((post: Post) => {
              post["strapiId"] = post.id;
              return <PostCard post={post} key={post.strapiId} />;
            })}
          </div>
        </div>
      </main>
    </Layout>
  );
}

export const query = graphql`
  query tagAndPost($slug: String!) {
    strapiTag(slug: { eq: $slug }) {
      name
      slug
      strapiId
      posts {
        id
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
`;
