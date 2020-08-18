const path = require(`path`);
const crypto = require(`crypto`);

const digest = data => {
  return crypto.createHash(`md5`).update(JSON.stringify(data)).digest(`hex`);
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allStrapiPost {
        edges {
          node {
            slug
          }
        }
      }
      allStrapiTag {
        edges {
          node {
            slug
          }
        }
      }
      allStrapiUser {
        edges {
          node {
            username
          }
        }
      }
    }
  `);

  result.data.allStrapiPost.edges.forEach(({ node }) => {
    createPage({
      path: `post/${node.slug}`,
      component: path.resolve(`./src/templates/post.tsx`),
      context: {
        slug: node.slug,
      },
    });
  });
  result.data.allStrapiTag.edges.forEach(({ node }) => {
    createPage({
      path: `tag/${node.slug}`,
      component: path.resolve(`./src/templates/tag.tsx`),
      context: {
        slug: node.slug,
      },
    });
  });
  result.data.allStrapiUser.edges.forEach(({ node }) => {
    createPage({
      path: `author/${node.username}`,
      component: path.resolve(`./src/templates/author.tsx`),
      context: {
        username: node.username,
      },
    });
  });
};

exports.onCreateNode = ({ node, actions }) => {
  const { createNode } = actions;
  if (node.internal.type === "StrapiPost") {
    createNode({
      ...node,
      id: node.id + "-markdown",
      parent: node.id,
      children: [],
      internal: {
        type: "Post",
        mediaType: "text/markdown",
        content: node.content ? node.content : "",
        contentDigest: digest(node),
      },
    });
  }
};
