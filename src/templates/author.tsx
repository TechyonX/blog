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
  excerpt: string;
  tags: [{ id: number; slug: string; name: string }];
  author: { id: number; username: string; email: string; full_name: string };
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
  full_name: string;
};

export default function Author({
  data,
}: {
  data: {
    allStrapiPost: {
      edges: [{ node: Post }];
    };
    strapiUser: Author;
  };
}) {
  return (
    <Layout seoProps={{ title: "Нүүр хуудас" }}>
      <main className="grid-container">
        <div className="cell shrink">
          <h1>Тавтай морил!</h1>
          <p>
            Нийтлэгч: {data.strapiUser.full_name}{" "}
            <small>{data.strapiUser.username}</small>{" "}
            {"<" + data.strapiUser.email + ">"}
          </p>
          <h3>Нийтлэлүүд: {data.allStrapiPost.edges.length}</h3>
          <div className="grid-x">
            {data.allStrapiPost.edges.map((post: { node: Post }) => {
              post.node["strapiId"] = post.node.id;
              return <PostCard post={post.node} key={post.node.id} />;
            })}
          </div>
        </div>
      </main>
    </Layout>
  );
}

export const query = graphql`
  query authorAndPost($username: String!) {
    allStrapiPost(
      sort: { fields: publish_at, order: DESC }
      filter: { author: { username: { eq: $username } } }
    ) {
      edges {
        node {
          strapiId
          title
          slug
          excerpt
          tags {
            slug
            name
            id
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
    strapiUser(username: { eq: $username }) {
      email
      strapiId
      username
      full_name
    }
  }
`;
