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

type Author = {
  strapiId: number;
  username: string;
  email: string;
  posts: [Post];
};

export default function Home({
  data,
}: {
  data: {
    strapiUser: Author;
  };
}) {
  return (
    <Layout seoProps={{ title: "Нүүр хуудас" }}>
      <main className="grid-container">
        <div className="cell shrink">
          <h1>Тавтай морил!</h1>
          <p>
            Нийтлэгч: {data.strapiUser.username}{" "}
            {"<" + data.strapiUser.email + ">"}
          </p>
          <h3>Нийтлэлүүд: {data.strapiUser.posts.length}</h3>
          <div className="grid-x">
            {data.strapiUser.posts.map((post: Post) => {
              post["strapiId"] = post.id;
              return <PostCard post={post} key={post.id} />;
            })}
          </div>
        </div>
      </main>
    </Layout>
  );
}

export const query = graphql`
  query authorAndPost($username: String!) {
    strapiUser(username: { eq: $username }) {
      email
      strapiId
      username
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
