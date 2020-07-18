const path = require(`path`);
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
};
