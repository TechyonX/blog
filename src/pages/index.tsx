import React from "react";
import Layout from "../components/layout";
import { Link, graphql, useStaticQuery } from "gatsby";

export default function Home() {
  const data = useStaticQuery(graphql`
    query {
      allStrapiPost {
        edges {
          node {
            strapiId
            title
            slug
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
  `);

  return (
    <Layout seoProps={{ title: "Нүүр хуудас" }}>
      <main className="grid-container">
        <div className="cell shrink">
          <h1>Тавтай морил!</h1>
          <h3>Нийтлэлүүд:</h3>
          <ul>
            {data.allStrapiPost.edges.map(post => {
              return (
                <li key={post.node.strapiId}>
                  <Link to={`/post/${post.node.strapiId}`}>
                    {post.node.title}
                  </Link>
                </li>
              );
            })}
          </ul>

          <h3>Төрлүүд:</h3>
          <ul>
            {data.allStrapiTag.edges.map(tag => {
              return (
                <li key={tag.node.strapiId}>
                  <Link to={`/tag/${tag.node.strapiId}`}>{tag.node.name}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </main>
    </Layout>
  );
}
